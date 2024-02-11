using Food_Journal.Contracts;
using Food_Journal.Models;
using System.Collections.Immutable;
using Newtonsoft.Json;
using System.Text;
using System;

namespace Food_Journal.Services
{
    public class ProductService
    {
        private readonly List<Product> _products = new();

        public ProductService()
        {
            string filePath = "D:\\ProgectsVS\\Kyrsovaya-2-semestr\\Food-Journal\\Food-Journal-Backend\\Services\\DataProducts\\BaseProducts.json"; // Update the file path accordingly

            if (File.Exists(filePath))
            {
                string json = File.ReadAllText(filePath);
                var productsJson = JsonConvert.DeserializeObject<List<ProductRequest>>(json);

                foreach (var product in productsJson)
                {
                    _products.Add(new Product
                    {
                        Id = Guid.NewGuid(),
                        Name = product.Name,
                        Proteins = product.Proteins,
                        Fats = product.Fats,
                        Carbohydrates = product.Carbohydrates,
                        Kcal = product.Kcal
                    });
                }

                foreach (var product in _products)
                {
                    Console.WriteLine($"Name: {product.Name}, Proteins: {product.Proteins}, Fats: {product.Fats}, Carbohydrates: {product.Carbohydrates}, Kcal: {product.Kcal}");
                }
            }
            else
            {
                Console.WriteLine("File not found at the specified path.");
            }
        }

        public IImmutableList<Product> GetAllProducts(Guid userId) => _products.Where(x => x.UserId == userId && x.UserId == null).ToImmutableList();

        public IImmutableList<Product> GetUserProducts(Guid userId) => _products.Where(x => x.UserId == userId).ToImmutableList();

        public IImmutableList<Product> GetBaseProducts() => _products.Where(x => x.UserId == null).ToImmutableList();

        public Product? GetProduct(Guid id, Guid userId) => _products.SingleOrDefault(x => x.Id == id && x.UserId == userId || x.Id == id && x.UserId == null);

        public Product AddProduct(ProductRequest request, Guid userId)
        {
            var product = new Product
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Name = request.Name,
                Proteins = request.Proteins,
                Fats = request.Fats,
                Carbohydrates = request.Carbohydrates,
                Kcal = request.Kcal
            };
            _products.Add(product);
            return product;
        }

        public Product? UpdateProduct(Guid id, ProductRequest request, Guid userId)
        {
            var product = GetProduct(id, userId);
            
            if (product is null) return null;
            product.Name = request.Name;
            product.Proteins = request.Proteins;
            product.Fats = request.Fats;
            product.Carbohydrates = request.Carbohydrates;
            product.Kcal = request.Kcal;
            return product;
        }

        public void DeleteProduct(Guid id, Guid userId)
        {
            var product = GetProduct(id, userId);
            if (product is null) return;
            _products.Remove(product);
        }

        public void ClearProducts(Guid userId) => _products.RemoveAll(x => x.UserId == userId);
    }
}
