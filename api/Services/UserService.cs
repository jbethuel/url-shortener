using System.Security.Claims;

namespace api.Services;

public class UserService
{
    public readonly string Id;

    public UserService(ClaimsPrincipal user)
    {
        var ctx =
            user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
            ?? throw new ArgumentException("User is null");

        Id = ctx.Value;
    }
}
