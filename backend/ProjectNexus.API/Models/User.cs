using System.ComponentModel.DataAnnotations;

namespace ProjectNexus.API.Models;

public class User
{
    public int UserId { get; set; }
    
    [Required]
    [StringLength(100)]
    public string LegalName { get; set; } = null!;
    
    [Required]
    [StringLength(50)]
    public string UserName { get; set; } = null!;
    
    [Required]
    [EmailAddress]
    [StringLength(255)]
    public string Email { get; set; } = null!;
    
    [Required]
    public string HashedPassword { get; set; } = null!;
    
    [Required]
    [StringLength(20)]
    public string Role { get; set; } = "User"; // Default role
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? LastLoginAt { get; set; }
    
    public bool IsEmailVerified { get; set; } = false;
    
    public string? EmailVerificationToken { get; set; }
    
    public DateTime? EmailVerificationTokenExpires { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    // Navigation properties
    public ICollection<UserTask> UserTasks { get; set; } = new List<UserTask>();
    public ICollection<ProjectUser> ProjectUsers { get; set; } = new List<ProjectUser>();
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}
