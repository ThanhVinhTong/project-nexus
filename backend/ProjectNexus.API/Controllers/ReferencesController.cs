using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectNexus.API.Data;
using ProjectNexus.API.Models;

namespace ProjectNexus.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReferencesController : ControllerBase
{
    private readonly AppDbContext _db;
    public ReferencesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetReferences()
    {
        try
        {
            var references = await _db.References.ToListAsync(); // Note: References DbSet maps to Reference
            return Ok(references);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetReference(int id)
    {
        try
        {
            var reference = await _db.References.FindAsync(id);

            if (reference == null)
                return NotFound($"Reference with ID {id} not found");

            return Ok(reference);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("project/{projectId}")]
    public async Task<IActionResult> GetReferencesByProject(int projectId)
    {
        try
        {
            var references = await _db.References
                .Where(r => r.ProjectId == projectId)
                .ToListAsync();
            return Ok(references);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateReference([FromBody] Reference reference)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _db.References.Add(reference);
            await _db.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetReference), new { id = reference.Id }, reference);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateReference(int id, [FromBody] Reference reference)
    {
        try
        {
            if (id != reference.Id)
                return BadRequest("Reference ID mismatch");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _db.Entry(reference).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            
            return Ok(reference);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReference(int id)
    {
        try
        {
            var reference = await _db.References.FindAsync(id);
            if (reference == null)
                return NotFound($"Reference with ID {id} not found");

            _db.References.Remove(reference);
            await _db.SaveChangesAsync();
            
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}