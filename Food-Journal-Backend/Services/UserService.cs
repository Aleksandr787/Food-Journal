using Food_Journal.Contracts;
using Food_Journal.Models;
using Food_Journal.Settings;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Food_Journal.Services
{
    public class UserService
    {
        private readonly List<User> _users = new();

        public User? GetUser(string email, string password) =>
            _users.SingleOrDefault(x => x.Email == email && x.Password == password);


        public User AddUser(UserRequest request)
        {
            var book = new User
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Email = request.Email,
                Password = request.Password
            };
            _users.Add(book);
            return book;
        }

        public static IResult Login(UserService userService, IOptions<AuthSettings> authSettings, LoginRequest request, CancellationToken cancellationToken)
        {
            var user = userService.GetUser(request.Email, request.Password);
            if (user is null)
                return Results.BadRequest();
            var result = Authorize(user, authSettings.Value);
            return Results.Json(result);
        }

        public static IResult Register(UserService userService, UserRequest request, CancellationToken cancellationToken)
        {
            var user = userService.AddUser(request);
            return Results.Ok();
        }

        private static LoginResponse Authorize(User user, AuthSettings authSettings)
        {
            var identity = new ClaimsIdentity(new[]
            {
            new Claim("id", user.Id.ToString()),
            new Claim("name", user.Name),
            new Claim("email", user.Email)
        });

            var secret = Encoding.UTF8.GetBytes(authSettings.JWTSecret!);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Issuer = authSettings.JWTIssuer,
                Audience = authSettings.JWTAudience,
                Expires = DateTime.UtcNow.AddDays(authSettings.JWTDaysToLive),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secret),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);

            return new LoginResponse
            {
                AccessToken = tokenHandler.WriteToken(securityToken)
            };
        }
    }
}
