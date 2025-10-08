using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectNexus.API.Data;
using ProjectNexus.API.Models;

namespace ProjectNexus.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectUserController : ControllerBase
{
    private readonly AppDbContext _db;
    public ProjectUserController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetProjectUsers()
    {
        try
        {
            var projectUsers = await _db.ProjectUsers
                .Include(pu => pu.Project)
                .Include(pu => pu.User)
                .ToListAsync();
            return Ok(projectUsers);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("project/{projectId}")]
    public async Task<IActionResult> GetUsersByProject(int projectId)
    {
        try
        {
            var projectUsers = await _db.ProjectUsers
                .Where(pu => pu.ProjectId == projectId)
                .Include(pu => pu.User)
                .Include(pu => pu.Project)
                .ToListAsync();
            return Ok(projectUsers);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetProjectsByUser(int userId)
    {
        try
        {
            var projectUsers = await _db.ProjectUsers
                .Where(pu => pu.UserId == userId)
                .Include(pu => pu.Project)
                .Include(pu => pu.User)
                .ToListAsync();
            return Ok(projectUsers);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{projectId}/{userId}")]
    public async Task<IActionResult> GetProjectUser(int projectId, int userId)
    {
        try
        {
            var projectUser = await _db.ProjectUsers
                .Include(pu => pu.Project)
                .Include(pu => pu.User)
                .FirstOrDefaultAsync(pu => pu.ProjectId == projectId && pu.UserId == userId);

            if (projectUser == null)
                return NotFound($"ProjectUser with ProjectId {projectId} and UserId {userId} not found");

            return Ok(projectUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddUserToProject([FromBody] ProjectUser projectUser)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check if user is already in project
            var existing = await _db.ProjectUsers
                .FirstOrDefaultAsync(pu => pu.ProjectId == projectUser.ProjectId && pu.UserId == projectUser.UserId);
            
            if (existing != null)
                return BadRequest("User is already a member of this project");

            projectUser.CreatedAt = DateTime.UtcNow;
            projectUser.UpdatedAt = DateTime.UtcNow;

            _db.ProjectUsers.Add(projectUser);
            await _db.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetProjectUser), 
                new { projectId = projectUser.ProjectId, userId = projectUser.UserId }, projectUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("{projectId}/{userId}")]
    public async Task<IActionResult> UpdateProjectUser(int projectId, int userId, [FromBody] ProjectUser projectUser)
    {
        try
        {
            if (projectId != projectUser.ProjectId || userId != projectUser.UserId)
                return BadRequest("ProjectUser ID mismatch");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingProjectUser = await _db.ProjectUsers
                .FirstOrDefaultAsync(pu => pu.ProjectId == projectId && pu.UserId == userId);
            
            if (existingProjectUser == null)
                return NotFound($"ProjectUser with ProjectId {projectId} and UserId {userId} not found");

            existingProjectUser.UserPermission = projectUser.UserPermission;
            existingProjectUser.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return Ok(existingProjectUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("{projectId}/{userId}")]
    public async Task<IActionResult> RemoveUserFromProject(int projectId, int userId)
    {
        try
        {
            var projectUser = await _db.ProjectUsers
                .FirstOrDefaultAsync(pu => pu.ProjectId == projectId && pu.UserId == userId);
            
            if (projectUser == null)
                return NotFound($"ProjectUser with ProjectId {projectId} and UserId {userId} not found");

            _db.ProjectUsers.Remove(projectUser);
            await _db.SaveChangesAsync();
            
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}