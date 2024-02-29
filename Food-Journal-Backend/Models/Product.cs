using System.ComponentModel.DataAnnotations;

namespace Food_Journal.Models
{
    public class Product
    {
        [Required]
        public Guid Id { get; init; }
        [Required]
        public Guid? UserId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public double Proteins { get; set; }
        [Required]
        public double Fats { get; set; }
        [Required]
        public double Carbohydrates { get; set; }
        [Required]
        public double Kcal { get; set; }

    }
}
