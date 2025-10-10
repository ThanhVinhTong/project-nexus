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
    public class AuthenticationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwtService;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(
            AppDbContext context,
            IJwtService jwtService,
            IPasswordHasher<User> passwordHasher,
            ILogger<AuthenticationController> logger)
        {
            _context = context;
            _jwtService = jwtService;
            _passwordHasher = passwordHasher;
            _logger = logger;
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
                var verificationToken = Guid.NewGuid().ToString();
                var user = new User
                {
                    LegalName = registerDto.LegalName,
                    UserName = registerDto.UserName,
                    Email = registerDto.Email.ToLowerInvariant(),
                    Role = "User", // Default role
                    IsActive = true,
                    IsEmailVerified = false,
                    EmailVerificationToken = verificationToken,
                    EmailVerificationTokenExpires = DateTime.UtcNow.AddHours(24), // 24 hours expiry
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

                // TODO: Send verification email here
                // For now, we'll just log it
                _logger.LogInformation("User {Email} registered successfully. Verification token: {Token}", 
                    user.Email, verificationToken);

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
                        CreatedAt = user.CreatedAt,
                        IsEmailVerified = user.IsEmailVerified
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
                        LastLoginAt = user.LastLoginAt,
                        IsEmailVerified = user.IsEmailVerified
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
        public async Task<ActionResult<AuthResponseDto>> RefreshToken(RefreshTokenDto refreshTokenDto)
        {
            try
            {
                var refreshToken = refreshTokenDto.RefreshToken;

                // Find refresh token in database
                var storedToken = await _context.RefreshTokens
                    .Include(rt => rt.User)
                    .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

                if (storedToken == null || storedToken.IsRevoked || storedToken.ExpiresAt < DateTime.UtcNow)
                {
                    return Unauthorized(new { message = "Invalid refresh token" });
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
                        LastLoginAt = storedToken.User.LastLoginAt,
                        IsEmailVerified = storedToken.User.IsEmailVerified
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
        [Authorize]
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
        [Authorize]
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
                    LastLoginAt = user.LastLoginAt,
                    IsEmailVerified = user.IsEmailVerified
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user profile");
                return StatusCode(500, new { message = "An error occurred while getting profile" });
            }
        }

        [HttpGet("admin-only")]
        [Authorize(Roles = "Admin")]
        public IActionResult AdminOnly()
        {
            return Ok(new { message = "This is an admin-only endpoint", user = User.Identity?.Name });
        }

        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailDto verifyEmailDto)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.EmailVerificationToken == verifyEmailDto.Token);

                if (user == null)
                {
                    return BadRequest(new { message = "Invalid verification token" });
                }

                if (user.EmailVerificationTokenExpires < DateTime.UtcNow)
                {
                    return BadRequest(new { message = "Verification token has expired" });
                }

                if (user.IsEmailVerified)
                {
                    return BadRequest(new { message = "Email is already verified" });
                }

                // Mark email as verified
                user.IsEmailVerified = true;
                user.EmailVerificationToken = null;
                user.EmailVerificationTokenExpires = null;
                user.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                _logger.LogInformation("Email verified for user {Email}", user.Email);

                return Ok(new { message = "Email verified successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during email verification");
                return StatusCode(500, new { message = "An error occurred during email verification" });
            }
        }

        [HttpPost("resend-verification")]
        public async Task<IActionResult> ResendVerificationEmail([FromBody] ResendVerificationDto resendDto)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == resendDto.Email.ToLowerInvariant());

                if (user == null)
                {
                    // Don't reveal if email exists or not for security
                    return Ok(new { message = "If the email exists, a verification email has been sent" });
                }

                if (user.IsEmailVerified)
                {
                    return BadRequest(new { message = "Email is already verified" });
                }

                // Generate new verification token
                var verificationToken = Guid.NewGuid().ToString();
                user.EmailVerificationToken = verificationToken;
                user.EmailVerificationTokenExpires = DateTime.UtcNow.AddHours(24); // 24 hours expiry
                user.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                // TODO: Send verification email here
                // For now, we'll just log it
                _logger.LogInformation("Verification email would be sent to {Email} with token {Token}", 
                    user.Email, verificationToken);

                return Ok(new { message = "If the email exists, a verification email has been sent" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during resend verification");
                return StatusCode(500, new { message = "An error occurred while resending verification email" });
            }
        }

        private void SetRefreshTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, // Prevent XSS attacks
                Secure = true, // Only send over HTTPS
                SameSite = SameSiteMode.Strict, // Prevent CSRF attacks
                Expires = _jwtService.GetRefreshTokenExpiry(),
                Path = "/api/authentication" // Restrict cookie path
            };

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
