using ProductAPI.Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace ProductAPI.API.Dtos
{
    public class CustomerBasketDto
    {
        [Required]
        public string Id { get; set; }
        public List<BasketItemDto> Items { get; set; }
    }
}
