using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectNexus.API.Data;
using ProjectNexus.API.Models;

namespace ProjectNexus.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _db;
    public TasksController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        try
        {
            var tasks = await _db.Tasks
                .Include(t => t.UserTasks)
                .ToListAsync();
            return Ok(tasks);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTask(int id)
    {
        try
        {
            var task = await _db.Tasks
                .Include(t => t.UserTasks)
                .FirstOrDefaultAsync(t => t.TaskId == id);

            if (task == null)
                return NotFound($"Task with ID {id} not found");

            return Ok(task);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("project/{projectId}")]
    public async Task<IActionResult> GetTasksByProject(int projectId)
    {
        try
        {
            var tasks = await _db.Tasks
                .Where(t => t.ProjectId == projectId)
                .Include(t => t.UserTasks)
                .ToListAsync();
            return Ok(tasks);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] Models.Task task)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            task.CreatedAt = DateTime.UtcNow;
            task.UpdatedAt = DateTime.UtcNow;

            _db.Tasks.Add(task);
            await _db.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetTask), new { id = task.TaskId }, task);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, [FromBody] Models.Task task)
    {
        try
        {
            if (id != task.TaskId)
                return BadRequest("Task ID mismatch");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingTask = await _db.Tasks.FindAsync(id);
            if (existingTask == null)
                return NotFound($"Task with ID {id} not found");

            existingTask.Title = task.Title;
            existingTask.Type = task.Type;
            existingTask.Priority = task.Priority;
            existingTask.DueDate = task.DueDate;
            existingTask.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return Ok(existingTask);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        try
        {
            var task = await _db.Tasks.FindAsync(id);
            if (task == null)
                return NotFound($"Task with ID {id} not found");

            _db.Tasks.Remove(task);
            await _db.SaveChangesAsync();
            
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}