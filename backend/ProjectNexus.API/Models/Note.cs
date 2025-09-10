namespace ProjectNexus.API.Models;

public class Note
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Content { get; set; } = null!;
    public int Version { get; set; } = 1;
}
