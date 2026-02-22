using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using ProjectNexus.API.Data;
using ProjectNexus.API.Models;
using ProjectNexus.API.Models.DTOs;
using ProjectNexus.API.Services;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace ProjectNexus.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class AuthenticationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwtService;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IHostEnvironment _env;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(
            AppDbContext context,
            IJwtService jwtService,
            IPasswordHasher<User> passwordHasher,
            ILogger<AuthenticationController> logger,
            IHostEnvironment env)
        {
            _context = context;
            _jwtService = jwtService;
            _passwordHasher = passwordHasher;
            _logger = logger;
            _env = env;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto registerDto)
        {
            try
            {
                // Check if user already exists
                if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
                {
                    return BadRequest(new { message = "User with this email already exists" });
                }

                if (await _context.Users.AnyAsync(u => u.UserName == registerDto.UserName))
                {
                    return BadRequest(new { message = "Username is already taken" });
                }

                // Create new user
                var user = new User
                {
                    LegalName = registerDto.LegalName,
                    UserName = registerDto.UserName,
                    Email = registerDto.Email.ToLowerInvariant(),
                    Role = "User", // Default role
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                // Hash password securely
                user.HashedPassword = _passwordHasher.HashPassword(user, registerDto.Password);

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // Generate tokens
                var accessToken = _jwtService.GenerateAccessToken(user);
                var refreshToken = _jwtService.GenerateRefreshToken();

                // Store refresh token
                var refreshTokenEntity = new RefreshToken
                {
                    Token = refreshToken,
                    UserId = user.UserId,
                    ExpiresAt = _jwtService.GetRefreshTokenExpiry(),
                    CreatedAt = DateTime.UtcNow
                };

                _context.RefreshTokens.Add(refreshTokenEntity);
                await _context.SaveChangesAsync();

                // Set HTTP-only cookie for refresh token
                SetRefreshTokenCookie(refreshToken);

                _logger.LogInformation("User {Email} registered successfully", user.Email);

                return Ok(new AuthResponseDto
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                    ExpiresAt = _jwtService.GetAccessTokenExpiry(),
                    User = new UserDto
                    {
                        UserId = user.UserId,
                        LegalName = user.LegalName,
                        UserName = user.UserName,
                        Email = user.Email,
                        Role = user.Role,
                        CreatedAt = user.CreatedAt
                    }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user registration");
                return StatusCode(500, new { message = "An error occurred during registration" });
            }
        }

        [HttpPost("login")]
        [EnableRateLimiting("LoginPolicy")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
        {
            try
            {
                // Find user by email
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == loginDto.Email.ToLowerInvariant());

                if (user == null || !user.IsActive)
                {
                    _logger.LogWarning("Login attempt with invalid email: {Email}", loginDto.Email);
                    return Unauthorized(new { message = "Invalid email or password" });
                }

                // Verify password
                var passwordResult = _passwordHasher.VerifyHashedPassword(user, user.HashedPassword, loginDto.Password);
                if (passwordResult == PasswordVerificationResult.Failed)
                {
                    _logger.LogWarning("Login attempt with invalid password for user: {Email}", user.Email);
                    return Unauthorized(new { message = "Invalid email or password" });
                }

                // Update last login
                user.LastLoginAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                // Generate tokens
                var accessToken = _jwtService.GenerateAccessToken(user);
                var refreshToken = _jwtService.GenerateRefreshToken();

                // Revoke old refresh tokens for this user
                var oldRefreshTokens = await _context.RefreshTokens
                    .Where(rt => rt.UserId == user.UserId && !rt.IsRevoked && rt.ExpiresAt > DateTime.UtcNow)
                    .ToListAsync();

                foreach (var oldToken in oldRefreshTokens)
                {
                    oldToken.IsRevoked = true;
                    oldToken.RevokedAt = DateTime.UtcNow;
                    oldToken.RevokedByIp = GetClientIpAddress();
                }

                // Store new refresh token
                var refreshTokenEntity = new RefreshToken
                {
                    Token = refreshToken,
                    UserId = user.UserId,
                    ExpiresAt = _jwtService.GetRefreshTokenExpiry(),
                    CreatedAt = DateTime.UtcNow
                };

                _context.RefreshTokens.Add(refreshTokenEntity);
                await _context.SaveChangesAsync();

                // Set HTTP-only cookie for refresh token
                SetRefreshTokenCookie(refreshToken);

                _logger.LogInformation("User {Email} logged in successfully", user.Email);

                return Ok(new AuthResponseDto
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                    ExpiresAt = _jwtService.GetAccessTokenExpiry(),
                    User = new UserDto
                    {
                        UserId = user.UserId,
                        LegalName = user.LegalName,
                        UserName = user.UserName,
                        Email = user.Email,
                        Role = user.Role,
                        CreatedAt = user.CreatedAt,
                        LastLoginAt = user.LastLoginAt
                    }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user login");
                return StatusCode(500, new { message = "An error occurred during login" });
            }
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<AuthResponseDto>> RefreshToken([FromBody] RefreshTokenDto? refreshTokenDto)
        {
            try
            {
                // Prefer body value; if missing, fall back to HttpOnly cookie
                var refreshToken = refreshTokenDto?.RefreshToken;
                if (string.IsNullOrWhiteSpace(refreshToken))
                {
                    Request.Cookies.TryGetValue("refreshToken", out refreshToken);
                }

                if (string.IsNullOrWhiteSpace(refreshToken))
                {
                    return BadRequest(new { message = "Refresh token is required" });
                }

                // Find refresh token in database
                var storedToken = await _context.RefreshTokens
                    .Include(rt => rt.User)
                    .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

                _logger.LogInformation("storedToken hehehe: {@StoredToken}", storedToken.Token);

                if (storedToken == null || storedToken.IsRevoked || storedToken.ExpiresAt < DateTime.UtcNow)
                {
                    return Unauthorized(new { message = "Invalid refresh token hehehehehe" });
                }

                // Generate new tokens
                var newAccessToken = _jwtService.GenerateAccessToken(storedToken.User);
                var newRefreshToken = _jwtService.GenerateRefreshToken();

                // Revoke old refresh token
                storedToken.IsRevoked = true;
                storedToken.RevokedAt = DateTime.UtcNow;
                storedToken.RevokedByIp = GetClientIpAddress();

                // Store new refresh token
                var newRefreshTokenEntity = new RefreshToken
                {
                    Token = newRefreshToken,
                    UserId = storedToken.UserId,
                    ExpiresAt = _jwtService.GetRefreshTokenExpiry(),
                    CreatedAt = DateTime.UtcNow
                };

                _context.RefreshTokens.Add(newRefreshTokenEntity);
                await _context.SaveChangesAsync();

                // Set HTTP-only cookie for new refresh token
                SetRefreshTokenCookie(newRefreshToken);

                return Ok(new AuthResponseDto
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken,
                    ExpiresAt = _jwtService.GetAccessTokenExpiry(),
                    User = new UserDto
                    {
                        UserId = storedToken.User.UserId,
                        LegalName = storedToken.User.LegalName,
                        UserName = storedToken.User.UserName,
                        Email = storedToken.User.Email,
                        Role = storedToken.User.Role,
                        CreatedAt = storedToken.User.CreatedAt,
                        LastLoginAt = storedToken.User.LastLoginAt
                    }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during token refresh");
                return StatusCode(500, new { message = "An error occurred during token refresh" });
            }
        }

        [HttpPost("logout")]
        // [Authorize]
        public async Task<IActionResult> Logout()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null) return Unauthorized();

                // Revoke all refresh tokens for this user
                var refreshTokens = await _context.RefreshTokens
                    .Where(rt => rt.UserId.ToString() == userId && !rt.IsRevoked && rt.ExpiresAt > DateTime.UtcNow)
                    .ToListAsync();

                foreach (var token in refreshTokens)
                {
                    token.IsRevoked = true;
                    token.RevokedAt = DateTime.UtcNow;
                    token.RevokedByIp = GetClientIpAddress();
                }

                await _context.SaveChangesAsync();

                // Clear refresh token cookie
                Response.Cookies.Delete("refreshToken");

                _logger.LogInformation("User {UserId} logged out successfully", userId);

                return Ok(new { message = "Logged out successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during logout");
                return StatusCode(500, new { message = "An error occurred during logout" });
            }
        }

        [HttpGet("profile")]
        // [Authorize]
        public async Task<ActionResult<UserDto>> GetProfile()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null) return Unauthorized();

                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserId.ToString() == userId);

                if (user == null) return NotFound();

                return Ok(new UserDto
                {
                    UserId = user.UserId,
                    LegalName = user.LegalName,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt,
                    LastLoginAt = user.LastLoginAt
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user profile");
                return StatusCode(500, new { message = "An error occurred while getting profile" });
            }
        }

        [HttpGet("admin-only")]
        // [Authorize(Roles = "Admin")]
        public IActionResult AdminOnly()
        {
            return Ok(new { message = "This is an admin-only endpoint", user = User.Identity?.Name });
        }

        // Email verification removed

        private void SetRefreshTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = _jwtService.GetRefreshTokenExpiry(),
                // Path root so it's sent to all auth endpoints
                Path = "/"
            };

            // Modern browsers require Secure=true when SameSite=None
            cookieOptions.Secure = true;
            cookieOptions.SameSite = SameSiteMode.None;

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }

        private string GetClientIpAddress()
        {
            // Get client IP address for security logging
            var xForwardedFor = Request.Headers["X-Forwarded-For"].FirstOrDefault();
            if (!string.IsNullOrEmpty(xForwardedFor))
            {
                return xForwardedFor.Split(',')[0].Trim();
            }

            var xRealIp = Request.Headers["X-Real-IP"].FirstOrDefault();
            if (!string.IsNullOrEmpty(xRealIp))
            {
                return xRealIp;
            }

            return Request.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
        }
    }
}
