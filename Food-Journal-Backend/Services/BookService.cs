using Bogus;
using Food_Journal.Contracts;
using Food_Journal.Models;
using System.Collections.Immutable;

namespace Food_Journal.Services
{
    public class BookService
    {
        private readonly List<Book> _books = new();
        private readonly string _defaultImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD1RY8i3RShS6UBJnsau1zgyI9Z2Z4xGeRCw&usqp=CAU";

        private readonly Faker<Book> _bookGenerator = new Faker<Book>("ru")
            .RuleFor(x => x.Id, faker => faker.Random.Guid())
            .RuleFor(x => x.Name, faker => faker.Lorem.Sentence(3))
            .RuleFor(x => x.Author, faker => $"{faker.Name.LastName()} {faker.Name.FirstName()[0]}.");

        public IImmutableList<Book> GetBooks(Guid userId) => _books.Where(x => x.UserId == userId).ToImmutableList();
        public Book? GetBook(Guid id, Guid userId) => _books.SingleOrDefault(x => x.Id == id && x.UserId == userId);

        public Book AddBook(BookRequest request, Guid userId)
        {
            var book = new Book
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Author = request.Author,
                Name = request.Name,
                ImageUrl = request.ImageUrl
            };
            _books.Add(book);
            return book;
        }

        public Book? UpdateBook(Guid id, BookRequest request, Guid userId)
        {
            var book = GetBook(id, userId);
            if (book is null) return null;
            book.Author = request.Author;
            book.Name = request.Name;
            book.ImageUrl = request.ImageUrl;
            return book;
        }

        public void DeleteBook(Guid id, Guid userId)
        {
            var book = GetBook(id, userId);
            if (book is null) return;
            _books.Remove(book);
        }

        public void GenerateBooks(int count, Guid userId)
        {
            var books = _bookGenerator.Generate(count);
            foreach (var book in books)
            {
                book.ImageUrl = _defaultImageUrl;
            }

            foreach (var book in books)
                book.UserId = userId;
            _books.AddRange(books);
        }

        public void ClearBooks(Guid userId) => _books.RemoveAll(x => x.UserId == userId);
    }
}
