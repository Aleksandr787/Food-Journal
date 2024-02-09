using System.ComponentModel.DataAnnotations;

namespace Food_Journal.Contracts
{
    public class BookRequest
    {
        [Required]
        public string Author { get; init; }
        [Required]
        public string Name { get; init; }
        [Required]
        public string ImageUrl { get; init; }
    }
}
