using Microsoft.EntityFrameworkCore;
using ProjectNexus.API.Models;

namespace ProjectNexus.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Models.Task> Tasks => Set<Models.Task>();
    public DbSet<Reference> References => Set<Reference>();
    public DbSet<Note> Notes => Set<Note>();
    public DbSet<ProjectUser> ProjectUsers => Set<ProjectUser>();
    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<UserTask> UserTasks => Set<UserTask>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure ProjectUser: Use Id as PK, unique constraint on (ProjectId, UserId)
        modelBuilder.Entity<ProjectUser>()
            .HasKey(pu => pu.Id);  // Matches model with explicit Id

        modelBuilder.Entity<ProjectUser>()
            .HasIndex(pu => new { pu.ProjectId, pu.UserId })
            .IsUnique();  // Prevent duplicates

        // Configure composite key for UserTask (no Id in model)
        modelBuilder.Entity<UserTask>()
            .HasKey(ut => new { ut.UserId, ut.TaskId });

        // Configure ProjectUser relationships
        modelBuilder.Entity<ProjectUser>()
            .HasOne(pu => pu.Project)
            .WithMany(p => p.ProjectUsers)
            .HasForeignKey(pu => pu.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProjectUser>()
            .HasOne(pu => pu.User)
            .WithMany(u => u.ProjectUsers)
            .HasForeignKey(pu => pu.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure UserTask relationships
        modelBuilder.Entity<UserTask>()
            .HasOne(ut => ut.User)
            .WithMany(u => u.UserTasks)
            .HasForeignKey(ut => ut.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserTask>()
            .HasOne(ut => ut.Task)
            .WithMany(t => t.UserTasks)
            .HasForeignKey(ut => ut.TaskId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure other one-to-many relationships with cascade delete
        modelBuilder.Entity<Models.Task>()
            .HasOne(t => t.Project)
            .WithMany(p => p.Tasks)
            .HasForeignKey(t => t.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Note>()
            .HasOne(n => n.Project)
            .WithMany(p => p.Notes)
            .HasForeignKey(n => n.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Reference>()
            .HasOne(r => r.Project)
            .WithMany(p => p.References)
            .HasForeignKey(r => r.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Activity>()
            .HasOne(a => a.Project)
            .WithMany(p => p.Activities)
            .HasForeignKey(a => a.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Optional: Configure nullability explicitly if needed (matches models)
        modelBuilder.Entity<Project>()
            .Property(p => p.Description).IsRequired(false);

        modelBuilder.Entity<Models.Task>()
            .Property(t => t.Type).IsRequired(false);
        modelBuilder.Entity<Models.Task>()
            .Property(t => t.Priority).IsRequired(false);
        modelBuilder.Entity<Models.Task>()
            .Property(t => t.DueDate).IsRequired(false);

        modelBuilder.Entity<Reference>()
            .Property(r => r.Url).IsRequired(false);

        modelBuilder.Entity<Reference>()
            .Property(r => r.Description).IsRequired(false);

        modelBuilder.Entity<Reference>()
            .Property(r => r.Authors).IsRequired(false);

        modelBuilder.Entity<UserTask>()
            .Property(ut => ut.Comment).IsRequired(false);

        base.OnModelCreating(modelBuilder);
    }
}