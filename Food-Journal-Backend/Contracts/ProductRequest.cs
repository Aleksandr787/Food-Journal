using System.ComponentModel.DataAnnotations;

namespace Food_Journal.Contracts
{
    public class ProductRequest
    {
        [Required]
        public string Name { get; init; }
        [Required]
        public double Proteins { get; init; }
        [Required]
        public double Fats { get; init; }
        [Required]
        public double Carbohydrates { get; init; }
        [Required]
        public double Kcal => Math.Round(Proteins*4 + Fats*9 + Carbohydrates*4);
    }
}
