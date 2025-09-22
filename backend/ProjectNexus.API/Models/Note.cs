namespace ProjectNexus.API.Models;

public class Note
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Content { get; set; } = null!;
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

    public Project Project { get; set; } = null!;
}