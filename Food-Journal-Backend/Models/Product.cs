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
        public float Proteins { get; set; }
        [Required]
        public float Fats { get; set; }
        [Required]
        public float Carbohydrates { get; set; }
        [Required]
        public float Kcal { get; set; }

    }
}
