using Food_Journal.Contracts;
using Food_Journal.Controllers.Data;
using Food_Journal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Food_Journal.Controllers
{
    [Route("api/books")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly BookService _bookService;

        public BookController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet("books")]
        [Authorize]
        public IResult GetBooks()
        {
            //var context = HttpContext;
            //if (!Guid.TryParse(context.User.Identities.First().Claims.First(x => x.Type == "id").Value, out var userId))
            //    throw new AuthenticationException("Can not verify a session");

            //Console.WriteLine("THIS CONTEXT STRING: " + context);
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            var result = _bookService.GetBooks(userId);
            return Results.Json(result);
        }

        [HttpGet("books/{id:guid}")]
        [Authorize]
        public IResult GetBook(Guid id)
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            var result = _bookService.GetBook(id, userId);
            return result is null ? Results.NotFound() : Results.Json(result);
        }

        [HttpPost("books")]
        [Authorize]
        public IResult AddBook(BookRequest request)
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            var result = _bookService.AddBook(request, userId);
            return Results.Created($"api/books/{result.Id}", result);
        }

        [HttpPut("books/{id:guid}")]
        [Authorize]
        public IResult UpdateBook(Guid id, BookRequest request)
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            var result = _bookService.UpdateBook(id, request, userId);
            return result is null ? Results.NotFound() : Results.Json(result);
        }

        [HttpDelete("books/{id:guid}")]
        [Authorize]
        public IResult DeleteBook(Guid id)
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            _bookService.DeleteBook(id, userId);
            return Results.Ok();
        }

        [HttpPost("books/generate/{count:int}")]
        [Authorize]
        public IResult GenerateBook(int count)
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            _bookService.GenerateBooks(count, userId);
            return Results.Ok();
        }

        [HttpDelete("books")]
        [Authorize]
        public IResult ClearBooks()
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            _bookService.ClearBooks(userId);
            return Results.Ok();
        }
    }
}
