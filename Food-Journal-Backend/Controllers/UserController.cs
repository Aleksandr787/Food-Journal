using Food_Journal.Contracts;
using Food_Journal.Models;
using Food_Journal.Services;
using Food_Journal.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Food_Journal.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private IOptions<AuthSettings> _authSettings;
        
        public UserController(UserService userService, IOptions<AuthSettings> authSettings)
        {
            _userService = userService;
            _authSettings = authSettings;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        [SwaggerOperation("Login to system AAAAAAA")]
        public ActionResult<LoginResponse> Login([FromBody] LoginRequest request, CancellationToken cancellationToken)
        {
            var user = _userService.GetUser(request.Email, request.Password);
            if (user is null)
                return BadRequest();
            var result = Authorize(user, _authSettings.Value);
            return Ok(result);
        }

        [HttpPost("register")]
        [Description("Регистрация нового пользователя")]
        public ActionResult<bool> Register([FromBody] UserRequest request, CancellationToken cancellationToken)
        {
            var user = _userService.AddUser(request);
            return user.Equals(null) ? Ok(false) : Ok(true);
        }

        private static LoginResponse Authorize(User user, AuthSettings? authSettings)
        {
            //var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authSettings.JWTSecret!));
            //var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            //var claims = new[]
            //{
            //    new Claim(ClaimTypes.NameIdentifier,user.Name),
            //    new Claim(ClaimTypes.Email,user.Email)
            //};

            //var token = new JwtSecurityToken(authSettings.JWTIssuer,
            //    authSettings.JWTAudience,
            //    claims,
            //    expires: DateTime.Now.AddDays(7),
            //    signingCredentials: credentials);


            //return new LoginResponse {
            //    AccessToken = new JwtSecurityTokenHandler().WriteToken(token)
            //};

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
