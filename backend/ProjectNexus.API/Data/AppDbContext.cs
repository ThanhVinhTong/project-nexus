using Microsoft.EntityFrameworkCore;
using ProjectNexus.API.Models;

namespace ProjectNexus.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<User> Users => Set<User>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Models.Task> Tasks => Set<Models.Task>();
    public DbSet<Models.File> Files => Set<Models.File>();
    public DbSet<Note> Notes => Set<Note>();
}
