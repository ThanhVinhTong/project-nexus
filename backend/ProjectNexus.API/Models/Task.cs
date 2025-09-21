namespace ProjectNexus.API.Models;

public class Task
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public int UserName { get; set; }
    public string Title { get; set; } = null!;
    public string Status { get; set; } = "Pending";
    public string Priority { get; set; } = "Default";
    public DateTime DueDate { get; set; } = DateTime.Now;
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
}
