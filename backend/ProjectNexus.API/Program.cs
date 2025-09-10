using Microsoft.EntityFrameworkCore;
using ProjectNexus.API.Data;

var builder = WebApplication.CreateBuilder(args);

// --------------------
// Add services
// --------------------

// Add controllers (for API endpoints)
builder.Services.AddControllers();

// Add DbContext (PostgreSQL)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS (for frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder
            .WithOrigins("http://localhost:3000") // your Next.js dev server
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// --------------------
// Configure pipeline
// --------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowFrontend");

// Map controllers
app.MapControllers();

// --------------------
// Optional: keep sample weather endpoint if you want
// --------------------
// app.MapGet("/weatherforecast", ... );

app.Run();
