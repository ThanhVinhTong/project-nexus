namespace ProjectNexus.API.Models;

public class File
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string FileName { get; set; } = null!;
    public string Url { get; set; } = null!;
}
