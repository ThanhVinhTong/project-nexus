namespace ProjectNexus.API.Models;

public enum TaskType
{
    Pending,
    To_Do,
    Ongoing,
    Completed,
    Need_Review
}

public enum Priority
{
    High,
    Medium,
    Low,
    Optional
}

public class Task
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string UserName { get; set; } = null!;
    public string Title { get; set; } = null!;
    public TaskType Type { get; set; } = TaskType.Pending;
    public Priority Priority { get; set; } = Priority.Optional;
    public DateTime DueDate { get; set; } = DateTime.Now;
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

    public Project Project { get; set; } = null!;
    public ICollection<UserTask> UserTasks { get; set; } = new List<UserTask>();
}
