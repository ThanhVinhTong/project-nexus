using System.ComponentModel.DataAnnotations;

namespace ProjectNexus.API.Models;

public class User
{
    public int Id { get; set; }
    public string LegalName { get; set; } = null!;
    public string UserName { get; set; } = null!;
    [EmailAddress]
    public string Email { get; set; } = null!;
    public string HashedPassword { get; set; } = null!;
    public string Role { get; set; } = null!;
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<UserTask> UserTasks { get; set; } = new List<UserTask>();
    public ICollection<ProjectUser> ProjectUsers { get; set; } = new List<ProjectUser>();
}
