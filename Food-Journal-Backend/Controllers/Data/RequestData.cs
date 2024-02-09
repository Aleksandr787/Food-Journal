using System.Reflection;
using System.Security.Authentication;

namespace Food_Journal.Controllers.Data
{
    public class RequestData
    {
        public Guid UserId { get; private set; }

        public static Task<Guid> BindAsync(HttpContext context)
        {
            if (!Guid.TryParse(context.User.Identities.First().Claims.First(x => x.Type == "id").Value, out var userId))
                throw new AuthenticationException("Can not verify a session");

            return Task.FromResult(userId);
        }
    }
}
