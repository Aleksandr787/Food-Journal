using Food_Journal.Controllers.Data;
using Food_Journal.Services;
using Food_Journal.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
//builder.Services.AddControllersWithViews();
//builder.Services.AddHttpContextAccessor();
// Add services to the container.
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<BookService>();
builder.Services.AddSingleton<ProductService>();


builder.Services.Configure<AuthSettings>(builder.Configuration.GetSection("AuthSettings"));

var authSettings = builder.Configuration.GetSection("AuthSettings").Get<AuthSettings>();
if (authSettings is null) return;

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // enable for https
    options.SaveToken = false;

    var key = Encoding.ASCII.GetBytes(authSettings.JWTSecret ?? throw new InvalidOperationException());

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = authSettings.JWTIssuer,
        ValidateAudience = true,
        ValidAudience = authSettings.JWTAudience,
        ClockSkew = TimeSpan.Zero
    };
});
builder.Services.AddAuthorization();

builder.Services.AddCors();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "JWT Authentication",
        // Description = “Enter JWT Bearer token **_only_**”,
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer", // must be lower case
        BearerFormat = "JWT",
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };
    c.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { securityScheme, new string[] { } }
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors(corsPolicyBuilder =>
{
    corsPolicyBuilder
        .WithOrigins("http://localhost:4200" ?? throw new InvalidOperationException())
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
});

app.UseAuthentication();
app.UseAuthorization();

//app.MapAuthEndpoints();
//app.MapBookEndpoints();
app.MapControllers();

app.Run();