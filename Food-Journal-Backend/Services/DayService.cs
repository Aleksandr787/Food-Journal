using Food_Journal.Contracts;
using Food_Journal.Models;
using System.Collections.Immutable;

namespace Food_Journal.Services
{
    public class DayService
    {
        private readonly List<Day> _days = new();

        public DayService() { }

        public IImmutableList<Day> GetDays(Guid userId) => _days.Where(x => x.UserId == userId).ToImmutableList();

        public Day? GetDay(DateTime dateId, Guid userId) => _days.SingleOrDefault(x => x.Id.Date == dateId.Date && x.UserId == userId);

        public Day AddDay(DateTime dateId, Guid userId)
        {
            var day = new Day
            {
                Id = dateId,
                UserId = userId,
                ProductItems = new List<ProductItem>()
            };

            _days.Add(day);
            return day;
        }

        public ProductItem AddProductItem(DateTime dateId, Guid userId, ProductItemRequest productItemRequest)
        {
            Day day = GetDay(dateId, userId);


            ProductItem productItem = new ProductItem(
                productItemRequest.Weight,
                productItemRequest.ProductRequest);

            day.ProductItems.Add(productItem);

            return productItem;
        }

        public bool DeleteProductItem(DateTime dateId, Guid userId, Guid ProductItemId)
        {
            var day = GetDay(dateId, userId);
            if (day == null) return false;

            var productItem = day.ProductItems.SingleOrDefault(x => x.Id == ProductItemId);
            if (productItem is null) return false;
            
            day.ProductItems.Remove(productItem);
            return true;
        }
    }
}
