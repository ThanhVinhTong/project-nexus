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
        // Configure composite key for ProjectUser
        modelBuilder.Entity<ProjectUser>()
            .HasKey(pu => new { pu.ProjectId, pu.UserId });

        // Configure composite key for UserTask
        modelBuilder.Entity<UserTask>()
            .HasKey(ut => new { ut.UserId, ut.TaskId });

        // Configure ProjectUser relationships explicitly
        modelBuilder.Entity<ProjectUser>()
            .HasOne(pu => pu.Project)
            .WithMany(p => p.ProjectUsers)
            .HasForeignKey(pu => pu.ProjectId)
            .HasPrincipalKey(p => p.Id);

        modelBuilder.Entity<ProjectUser>()
            .HasOne(pu => pu.User)
            .WithMany(u => u.ProjectUsers)
            .HasForeignKey(pu => pu.UserId)
            .HasPrincipalKey(u => u.Id);

        // Configure UserTask relationships explicitly
        modelBuilder.Entity<UserTask>()
            .HasOne(ut => ut.User)
            .WithMany(u => u.UserTasks)
            .HasForeignKey(ut => ut.UserId)
            .HasPrincipalKey(u => u.Id);

        modelBuilder.Entity<UserTask>()
            .HasOne(ut => ut.Task)
            .WithMany(t => t.UserTasks)
            .HasForeignKey(ut => ut.TaskId)
            .HasPrincipalKey(t => t.Id);

        // Configure other one-to-many relationships
        modelBuilder.Entity<Models.Task>()
            .HasOne(t => t.Project)
            .WithMany(p => p.Tasks)
            .HasForeignKey(t => t.ProjectId);

        modelBuilder.Entity<Note>()
            .HasOne(n => n.Project)
            .WithMany(p => p.Notes)
            .HasForeignKey(n => n.ProjectId);

        modelBuilder.Entity<Reference>()
            .HasOne(r => r.Project)
            .WithMany(p => p.References)
            .HasForeignKey(r => r.ProjectId);

        modelBuilder.Entity<Activity>()
            .HasOne(a => a.Project)
            .WithMany(p => p.Activities)
            .HasForeignKey(a => a.ProjectId);

        base.OnModelCreating(modelBuilder);
    }
}