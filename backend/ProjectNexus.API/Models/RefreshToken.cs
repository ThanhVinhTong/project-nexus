using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectNexus.API.Models
{
    public class RefreshToken
    {
        public int RefreshTokenId { get; set; }
        
        [Required]
        public string Token { get; set; } = null!;
        
        [Required]
        public int UserId { get; set; }
        
        public DateTime ExpiresAt { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public bool IsRevoked { get; set; } = false;
        
        public string? RevokedByIp { get; set; }
        
        public DateTime? RevokedAt { get; set; }
        
        // Navigation property
        public User User { get; set; } = null!;
    }
}
