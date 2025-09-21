namespace ProjectNexus.API.Models;

public class Activity
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Message { get; set; } = null!;
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
}
