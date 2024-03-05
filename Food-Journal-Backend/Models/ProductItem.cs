using Food_Journal.Contracts;
using System.ComponentModel.DataAnnotations;

namespace Food_Journal.Models
{
    public class ProductItem
    {
        [Required]
        public Guid Id { get; init; }
        [Required]
        public double Weight { get; init; }
        [Required]
        public ProductRequest Product { get; set; }
        public double Proteins { get; }
        public double Fats { get; }
        public double Carbohydrates { get; }
        public double Kcal { get; }
        
        private double CalculateNutrient(double nutrientPer100g)
        {
            if (nutrientPer100g == 0)
            {
                return 0;
            }
         
            return Math.Round((Weight / 100 * nutrientPer100g), 2, MidpointRounding.AwayFromZero);
        }

        public ProductItem(double weight, ProductRequest product)
        {
            Id = Guid.NewGuid();
            Weight = weight;
            Product = product;
            Proteins = CalculateNutrient(Product.Proteins);
            Fats = CalculateNutrient(Product.Fats);
            Carbohydrates = CalculateNutrient(Product.Carbohydrates);
            Kcal = CalculateNutrient(Product.Kcal);
        }
    }
}
