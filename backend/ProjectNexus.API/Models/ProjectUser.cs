using System.Text.Json.Serialization;

namespace ProjectNexus.API.Models;

public class ProjectUser
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public int UserId { get; set; }
    public string UserPermission { get; set; } = null!;
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    [JsonIgnore]
    public Project Project { get; set; } = null!;
    public User User { get; set; } = null!;
}
