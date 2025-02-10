using ProductAPI.Core.Entities;
using ProductAPI.Infrastructure.Data;
using System.Text.Json;

namespace ProductAPI.Infrastructure
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreDbContext context, ILoggerFactory loggerFactory)
        {
            var basePath = Directory.GetCurrentDirectory();
            
            try
            {
                if (!context.ProductBrands.Any())
                {
                    var brandsDataPath = Path.Combine(basePath, "Infrastructure", "Data", "SeedData", "brands.json");

                    var brandsData = File.ReadAllText(brandsDataPath);

                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                    foreach (var item in brands)
                    {
                        context.ProductBrands.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.ProductTypes.Any())
                {
                    var typesDataPath = Path.Combine(basePath, "Infrastructure", "Data", "SeedData", "types.json");

                    var typesData = File.ReadAllText(typesDataPath);

                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                    foreach (var item in types)
                    {
                        context.ProductTypes.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var productsDataPath = Path.Combine(basePath, "Infrastructure", "Data", "SeedData", "products.json");

                    var productsData = File.ReadAllText(productsDataPath);

                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                    foreach (var item in products)
                    {
                        context.Products.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            } 
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}
