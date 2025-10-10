namespace ProjectNexus.API.Models;

public class Project
{
    public int ProjectId { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public DateTime? Deadline { get; set; }
    public string Status { get; set; } = null!;
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<Task> Tasks { get; set; } = new List<Task>();
    public ICollection<ProjectUser> ProjectUsers { get; set; } = new List<ProjectUser>();
    public ICollection<Note> Notes { get; set; } = new List<Note>();
    public ICollection<Reference> References { get; set; } = new List<Reference>();
    public ICollection<Activity> Activities { get; set; } = new List<Activity>();
}
