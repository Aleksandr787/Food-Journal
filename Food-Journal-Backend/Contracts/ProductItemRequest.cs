using Food_Journal.Models;
using System.ComponentModel.DataAnnotations;

namespace Food_Journal.Contracts
{
    public class ProductItemRequest
    {
        [Required]
        public double Weight { get; init; }
        [Required]
        public ProductRequest ProductRequest { get; set; }
    }
}
