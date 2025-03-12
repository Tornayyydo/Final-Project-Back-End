using ProductAPI.Core.Entities.Identity;

namespace ProductAPI.Core.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
