namespace ProjectNexus.API.Models;

public class Task
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Title { get; set; } = null!;
    public string Status { get; set; } = "Pending";
}
