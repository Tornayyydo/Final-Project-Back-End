using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Core.Entities.Identity;
using System.Runtime.CompilerServices;
using System.Security.Claims;

namespace ProductAPI.API.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindByUserByClaimsPrincipleWithAdressAsync(
    this UserManager<AppUser> input, ClaimsPrincipal user)
        {
            var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var appUser = await input.Users
                .Include(x => x.Address)
                .SingleOrDefaultAsync(x => x.Email == email);

            return appUser;
        }


        public static async Task<AppUser> FindByEmailFromClaimsPrinciple(this UserManager<AppUser> input, ClaimsPrincipal user)
        {
            var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email).Value;

            return await input.Users.SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}
