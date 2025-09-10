using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectNexus.API.Data;
using ProjectNexus.API.Models;

namespace ProjectNexus.API.Data;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ProjectsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetProjects() => Ok(await _db.Projects.ToListAsync());

    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] Project project)
    {
        _db.Projects.Add(project);
        await _db.SaveChangesAsync();
        return Ok(project);
    }
}
