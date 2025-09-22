using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectNexus.API.Data;
using ProjectNexus.API.Models;

namespace ProjectNexus.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserTaskController : ControllerBase
{
    private readonly AppDbContext _db;
    public UserTaskController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetUserTasks()
    {
        try
        {
            var userTasks = await _db.UserTasks
                .Include(ut => ut.User)
                .Include(ut => ut.Task)
                .ToListAsync();
            return Ok(userTasks);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetTasksByUser(int userId)
    {
        try
        {
            var userTasks = await _db.UserTasks
                .Where(ut => ut.UserId == userId)
                .Include(ut => ut.Task)
                .Include(ut => ut.User)
                .ToListAsync();
            return Ok(userTasks);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("task/{taskId}")]
    public async Task<IActionResult> GetUsersByTask(int taskId)
    {
        try
        {
            var userTasks = await _db.UserTasks
                .Where(ut => ut.TaskId == taskId)
                .Include(ut => ut.User)
                .Include(ut => ut.Task)
                .ToListAsync();
            return Ok(userTasks);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{userId}/{taskId}")]
    public async Task<IActionResult> GetUserTask(int userId, int taskId)
    {
        try
        {
            var userTask = await _db.UserTasks
                .Include(ut => ut.User)
                .Include(ut => ut.Task)
                .FirstOrDefaultAsync(ut => ut.UserId == userId && ut.TaskId == taskId);

            if (userTask == null)
                return NotFound($"UserTask with UserId {userId} and TaskId {taskId} not found");

            return Ok(userTask);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> AssignTaskToUser([FromBody] UserTask userTask)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check if assignment already exists
            var existing = await _db.UserTasks
                .FirstOrDefaultAsync(ut => ut.UserId == userTask.UserId && ut.TaskId == userTask.TaskId);
            
            if (existing != null)
                return BadRequest("User is already assigned to this task");

            userTask.CreatedAt = DateTime.UtcNow;
            userTask.UpdatedAt = DateTime.UtcNow;

            _db.UserTasks.Add(userTask);
            await _db.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetUserTask), 
                new { userId = userTask.UserId, taskId = userTask.TaskId }, userTask);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("{userId}/{taskId}")]
    public async Task<IActionResult> UpdateUserTask(int userId, int taskId, [FromBody] UserTask userTask)
    {
        try
        {
            if (userId != userTask.UserId || taskId != userTask.TaskId)
                return BadRequest("UserTask ID mismatch");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingUserTask = await _db.UserTasks
                .FirstOrDefaultAsync(ut => ut.UserId == userId && ut.TaskId == taskId);
            
            if (existingUserTask == null)
                return NotFound($"UserTask with UserId {userId} and TaskId {taskId} not found");

            existingUserTask.Comment = userTask.Comment;
            existingUserTask.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return Ok(existingUserTask);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("{userId}/{taskId}")]
    public async Task<IActionResult> UnassignTaskFromUser(int userId, int taskId)
    {
        try
        {
            var userTask = await _db.UserTasks
                .FirstOrDefaultAsync(ut => ut.UserId == userId && ut.TaskId == taskId);
            
            if (userTask == null)
                return NotFound($"UserTask with UserId {userId} and TaskId {taskId} not found");

            _db.UserTasks.Remove(userTask);
            await _db.SaveChangesAsync();
            
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}