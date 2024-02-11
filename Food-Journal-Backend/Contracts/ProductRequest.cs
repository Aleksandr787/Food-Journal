using System.ComponentModel.DataAnnotations;

namespace Food_Journal.Contracts
{
    public class ProductRequest
    {
        [Required]
        public string Name { get; init; }
        [Required]
        public float Proteins { get; init; }
        [Required]
        public float Fats { get; init; }
        [Required]
        public float Carbohydrates { get; init; }
        [Required]
        public float Kcal { get; init; }
    }
}
