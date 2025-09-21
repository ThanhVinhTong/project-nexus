namespace ProjectNexus.API.Models;

public class Reference
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string FileName { get; set; } = null!;
    public string Url { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string[] Authors { get; set; } = {};
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
}
