using System.ComponentModel.DataAnnotations;

namespace Food_Journal.Models
{
    public class Book
    {
        [Required]
        public Guid Id { get; init; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string ImageUrl { get; set; }

    }
}
