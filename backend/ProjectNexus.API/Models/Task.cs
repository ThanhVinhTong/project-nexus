namespace ProjectNexus.API.Models;

public class Task
{
    public int TaskId { get; set; }
    public int ProjectId { get; set; }
    public string Title { get; set; } = null!;
    public string? Type { get; set; }
    public string? Priority { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    public Project Project { get; set; } = null!;
    public ICollection<UserTask> UserTasks { get; set; } = new List<UserTask>();
}
