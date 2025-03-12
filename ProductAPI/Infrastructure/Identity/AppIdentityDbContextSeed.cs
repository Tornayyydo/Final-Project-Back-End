using Microsoft.AspNetCore.Identity;
using ProductAPI.Core.Entities.Identity;

namespace ProductAPI.Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Gio",
                    Email = "gio@test.com",
                    UserName = "gio_gio",
                    Address = new Address
                    {
                        FirstName = "Gio",
                        LastName = "Giorgadze",
                        Street = "Rustavelis 20",
                        City = "Tbilisi",
                        Zipcode = "0162"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}
