using System.ComponentModel.DataAnnotations;

namespace ProjectNexus.API.Models;

public enum UserRole
{
    Admin,          // System-wide full control
    ProjectManager, // Manages project/team
    Researcher,     // Contributes domain expertise
    Associate,      // Regular team member
    Intern,         // Limited contributor
    Viewer          // Read-only
}

public class User
{
    public int Id { get; set; }
    public string LegalName { get; set; } = null!;
    public string UserName { get; set; } = null!;
    [EmailAddress]
    public string Email { get; set; } = null!;
    public UserRole Role { get; set; } = UserRole.Associate;
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<UserTask> UserTasks { get; set; } = new List<UserTask>();
    public ICollection<ProjectUser> ProjectUsers { get; set; } = new List<ProjectUser>();
}
