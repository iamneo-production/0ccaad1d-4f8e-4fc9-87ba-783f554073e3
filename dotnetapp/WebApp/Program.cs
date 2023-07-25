using dotnetapp.DataBase;
using dotnetapp.Services;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("Database")));



builder.Services.AddScoped<IEmailService,EmailService>();

// Creation of allow single page application framework
builder.Services.AddCors((options)=>
{
    options.AddPolicy("Devcors",(corebuilder)=>{
        corebuilder.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors("Devcors");
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
