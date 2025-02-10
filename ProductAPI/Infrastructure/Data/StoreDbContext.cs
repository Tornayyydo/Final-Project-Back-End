using Microsoft.EntityFrameworkCore;
using ProductAPI.Core.Entities;
using System.Reflection;

namespace ProductAPI.Infrastructure.Data
{
    public class StoreDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public StoreDbContext(DbContextOptions<StoreDbContext> options) : base(options)
        {

        }
    }
}
