using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectNexus.API.Data;
using ProjectNexus.API.Models;

namespace ProjectNexus.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ProjectsController(AppDbContext db) => _db = db;

    [HttpGet]
    // [Authorize]
    public async Task<IActionResult> GetProjects()
    {
        try
        {
            // Get current authenticated user id (Hardcoded for demo)
            var userIdClaim = "1"; 
            /*
            var userIdClaim = User?.Claims?.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim))
            {
                return Unauthorized();
            }
            */

            var projects = await _db.Projects
                .Include(p => p.ProjectUsers)
                    .ThenInclude(pu => pu.User)
                .Include(p => p.Tasks)
                .Include(p => p.Notes)
                .Include(p => p.References)
                .Include(p => p.Activities)
                .Where(p => p.ProjectUsers.Any(pu => pu.UserId.ToString() == userIdClaim))
                .ToListAsync();
            return Ok(projects);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    // [Authorize]
    public async Task<IActionResult> GetProject(int id)
    {
        try
        {
            var project = await _db.Projects
                .Include(p => p.ProjectUsers)
                .Include(p => p.Tasks)
                .Include(p => p.Notes)
                .Include(p => p.References)
                .Include(p => p.Activities)
                .FirstOrDefaultAsync(p => p.ProjectId == id);

            if (project == null)
                return NotFound($"Project with ID {id} not found");

            return Ok(project);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    // [Authorize]
    public async Task<IActionResult> CreateProject([FromBody] Project project)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            project.CreatedAt = DateTime.UtcNow;
            project.UpdatedAt = DateTime.UtcNow;

            _db.Projects.Add(project);
            await _db.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetProject), new { id = project.ProjectId }, project);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    // [Authorize]
    public async Task<IActionResult> UpdateProject(int id, [FromBody] Project project)
    {
        try
        {
            if (id != project.ProjectId)
                return BadRequest("Project ID mismatch");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingProject = await _db.Projects.FindAsync(id);
            if (existingProject == null)
                return NotFound($"Project with ID {id} not found");

            existingProject.Title = project.Title;
            existingProject.Description = project.Description;
            existingProject.Deadline = project.Deadline;
            existingProject.Status = project.Status;
            existingProject.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return Ok(existingProject);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    // [Authorize]
    public async Task<IActionResult> DeleteProject(int id)
    {
        try
        {
            var project = await _db.Projects.FindAsync(id);
            if (project == null)
                return NotFound($"Project with ID {id} not found");

            _db.Projects.Remove(project);
            await _db.SaveChangesAsync();
            
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}