namespace ProjectNexus.API.Models;

public class UserTask
{
    public int TaskId { get; set; }
    public int UserId { get; set; }
    public string Comment { get; set; } = null!;
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

    public Task Task { get; set; } = null!;
    public User User { get; set; } = null!;
}