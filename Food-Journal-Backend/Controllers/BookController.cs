using Food_Journal.Contracts;
using Food_Journal.Controllers.Data;
using Food_Journal.Models;
using Food_Journal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Food_Journal.Controllers
{
    //[Route("api/")]
    //[ApiController]
    //public class BookController : ControllerBase
    //{
    //    private readonly BookService _bookService;

    //    public BookController(BookService bookService)
    //    {
    //        _bookService = bookService;
    //    }

    //    [HttpGet("books")]
    //    [Authorize]
    //    public ActionResult<List<Book>> GetBooks()
    //    {
    //        //var context = HttpContext;
    //        //if (!Guid.TryParse(context.User.Identities.First().Claims.First(x => x.Type == "id").Value, out var userId))
    //        //    throw new AuthenticationException("Can not verify a session");

    //        //Console.WriteLine("THIS CONTEXT STRING: " + context);
    //        var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
    //        var result = _bookService.GetBooks(userId);
    //        return Ok(result);
    //    }

    //    [HttpGet("books/{id:guid}")]
    //    [Authorize]
    //    public ActionResult<Book> GetBook(Guid id)
    //    {
    //        var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
    //        var result = _bookService.GetBook(id, userId);
    //        return result is null ? NotFound() : Ok(result);
    //    }

    //    [HttpPost("books")]
    //    [Authorize]
    //    public ActionResult<Book> AddBook(BookRequest request)
    //    {
    //        var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
    //        var result = _bookService.AddBook(request, userId);
    //        return Ok(result);
    //    }

    //    [HttpPut("books/{id:guid}")]
    //    [Authorize]
    //    public ActionResult<Book?> UpdateBook(Guid id, BookRequest request)
    //    {
    //        var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
    //        var result = _bookService.UpdateBook(id, request, userId);
    //        return result is null ? NotFound() : Ok(result);
    //    }

    //    [HttpDelete("books/{id:guid}")]
    //    [Authorize]
    //    public ActionResult DeleteBook(Guid id)
    //    {
    //        var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
    //        _bookService.DeleteBook(id, userId);
    //        return Ok();
    //    }

    //    [HttpPost("books/generate/{count:int}")]
    //    [Authorize]
    //    public ActionResult GenerateBook(int count)
    //    {
    //        var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
    //        _bookService.GenerateBooks(count, userId);
    //        return Ok();
    //    }

    //    [HttpDelete("books")]
    //    [Authorize]
    //    public ActionResult ClearBooks()
    //    {
    //        var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
    //        _bookService.ClearBooks(userId);
    //        return Ok();
    //    }
    //}
}
