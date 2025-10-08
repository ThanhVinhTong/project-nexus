using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectNexus.API.Data;
using ProjectNexus.API.Models;

namespace ProjectNexus.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _db;

    public UserController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            var users = await _db.Users
                .Include(u => u.ProjectUsers)
                .Include(u => u.UserTasks)
                .ToListAsync();
            return Ok(users);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        try
        {
            var user = await _db.Users
                .Include(u => u.ProjectUsers)
                .Include(u => u.UserTasks)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound($"User with ID {id} not found");

            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] User user)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
    {
        try
        {
            if (id != updatedUser.Id)
                return BadRequest("ID mismatch");

            var user = await _db.Users.FindAsync(id);
            if (user == null)
                return NotFound($"User with ID {id} not found");

            user.LegalName = updatedUser.LegalName;
            user.UserName = updatedUser.UserName;
            user.Email = updatedUser.Email;
            user.Role = updatedUser.Role;
            user.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
                return NotFound($"User with ID {id} not found");

            _db.Users.Remove(user);
            await _db.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}