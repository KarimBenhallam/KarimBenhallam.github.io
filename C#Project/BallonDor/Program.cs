using BallonDorProcessor.Services.Implementations;
using BallonDorProcessor.Services.Interfaces;
using DataAccess.Repositories.Implementations;
using DataAccess.Repositories.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//repo
builder.Services.AddTransient<IBallonDorRepository, BallonDorRepository>();

//service
builder.Services.AddTransient<IBallonDorService, BallonDorService>();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAnyOrigin");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
