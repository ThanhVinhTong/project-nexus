using System.ComponentModel.DataAnnotations;

namespace ProjectNexus.API.Models;

public class Reference
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string ReferenceName { get; set; } = null!;
    [Url]
    public string Url { get; set; } = null!;
    public string Description { get; set; } = null!;
    public User[] Authors { get; set; } = { };
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public Project Project { get; set; } = null!;
}
