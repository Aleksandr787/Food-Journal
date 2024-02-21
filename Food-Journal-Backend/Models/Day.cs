using System.ComponentModel.DataAnnotations;

namespace Food_Journal.Models
{
    public class Day
    {
        [Required]
        public DateTime Id { get; init; }
        public Guid UserId { get; init; }
        public List<ProductItem> ProductItems { get; set; }
    }
}
