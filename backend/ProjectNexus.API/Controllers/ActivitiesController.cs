using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectNexus.API.Data;
using ProjectNexus.API.Models;

namespace ProjectNexus.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : ControllerBase
{
    private readonly AppDbContext _db;
    public ActivitiesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetActivities()
    {
        try
        {
            var activities = await _db.Activities.ToListAsync();
            return Ok(activities);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivity(int id)
    {
        try
        {
            var activity = await _db.Activities.FindAsync(id);

            if (activity == null)
                return NotFound($"Activity with ID {id} not found");

            return Ok(activity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("project/{projectId}")]
    public async Task<IActionResult> GetActivitiesByProject(int projectId)
    {
        try
        {
            var activities = await _db.Activities
                .Where(a => a.ProjectId == projectId)
                .ToListAsync();
            return Ok(activities);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _db.Activities.Add(activity);
            await _db.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetActivity), new { id = activity.ActivityId }, activity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateActivity(int id, [FromBody] Activity activity)
    {
        try
        {
            if (id != activity.ActivityId)
                return BadRequest("Activity ID mismatch");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _db.Entry(activity).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            
            return Ok(activity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(int id)
    {
        try
        {
            var activity = await _db.Activities.FindAsync(id);
            if (activity == null)
                return NotFound($"Activity with ID {id} not found");

            _db.Activities.Remove(activity);
            await _db.SaveChangesAsync();
            
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}