using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectNexus.API.Data;
using ProjectNexus.API.Models;

namespace ProjectNexus.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController : ControllerBase
{
    private readonly AppDbContext _db;
    public NotesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetNotes()
    {
        try
        {
            var notes = await _db.Notes.ToListAsync();
            return Ok(notes);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetNote(int id)
    {
        try
        {
            var note = await _db.Notes.FindAsync(id);

            if (note == null)
                return NotFound($"Note with ID {id} not found");

            return Ok(note);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("project/{projectId}")]
    public async Task<IActionResult> GetNotesByProject(int projectId)
    {
        try
        {
            var notes = await _db.Notes
                .Where(n => n.ProjectId == projectId)
                .ToListAsync();
            return Ok(notes);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateNote([FromBody] Note note)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _db.Notes.Add(note);
            await _db.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNote(int id, [FromBody] Note note)
    {
        try
        {
            if (id != note.Id)
                return BadRequest("Note ID mismatch");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _db.Entry(note).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            
            return Ok(note);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(int id)
    {
        try
        {
            var note = await _db.Notes.FindAsync(id);
            if (note == null)
                return NotFound($"Note with ID {id} not found");

            _db.Notes.Remove(note);
            await _db.SaveChangesAsync();
            
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}