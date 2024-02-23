﻿using Food_Journal.Contracts;
using Food_Journal.Controllers.Data;
using Food_Journal.Models;
using Food_Journal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Food_Journal.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("products/base")]
        [Authorize]
        public ActionResult<List<Product>> GetBaseProducts()
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            var result = _productService.GetBaseProducts();
            return Ok(result);
        }

        [HttpGet("products/user")]
        [Authorize]
        public ActionResult<List<Product>> GetUserProducts()
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            var result = _productService.GetUserProducts(userId);
            return Ok(result);
        }

        [HttpGet("products/{id:guid}")]
        [Authorize]
        public ActionResult<Product> GetProduct(Guid id)
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            var result = _productService.GetProduct(id, userId);
            return result is null ? NotFound() : Ok(result);
        }

        [HttpPost("products")]
        [Authorize]
        public ActionResult<Product> AddProduct(ProductRequest request)
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            var result = _productService.AddProduct(request, userId);
            return Ok(result);
        }

        [HttpPut("products/{id:guid}")]
        [Authorize]
        public ActionResult<Product?> UpdateProduct(Guid id, ProductRequest request)
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            var result = _productService.UpdateProduct(id, request, userId);
            return result is null ? NotFound() : Ok(result);
        }

        [HttpDelete("products/{id:guid}")]
        [Authorize]
        public ActionResult DeleteProduct(Guid id)
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            _productService.DeleteProduct(id, userId);
            return Ok();
        }

        //[HttpGet("books")]
        //[Authorize]
        //public ActionResult<List<Product>> GetBooks()
        //{
        //    //var context = HttpContext;
        //    //if (!Guid.TryParse(context.User.Identities.First().Claims.First(x => x.Type == "id").Value, out var userId))
        //    //    throw new AuthenticationException("Can not verify a session");

        //    //Console.WriteLine("THIS CONTEXT STRING: " + context);
        //    var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
        //    var result = _productService.GetBooks(userId);
        //    return Ok(result);
        //}

        //[HttpGet("books/{id:guid}")]
        //[Authorize]
        //public ActionResult<Product> GetBook(Guid id)
        //{
        //    var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
        //    var result = _productService.GetBook(id, userId);
        //    return result is null ? NotFound() : Ok(result);
        //}

        //[HttpPost("books")]
        //[Authorize]
        //public ActionResult<Product> AddBook(BookRequest request)
        //{
        //    var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
        //    var result = _productService.AddBook(request, userId);
        //    return Ok(result);
        //}

        //[HttpPut("books/{id:guid}")]
        //[Authorize]
        //public ActionResult<Product?> UpdateBook(Guid id, BookRequest request)
        //{
        //    var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
        //    var result = _productService.UpdateBook(id, request, userId);
        //    return result is null ? NotFound() : Ok(result);
        //}

        //[HttpDelete("books/{id:guid}")]
        //[Authorize]
        //public ActionResult DeleteBook(Guid id)
        //{
        //    var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
        //    _productService.DeleteBook(id, userId);
        //    return Ok();
        //}

        //[HttpPost("books/generate/{count:int}")]
        //[Authorize]
        //public ActionResult GenerateBook(int count)
        //{
        //    var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
        //    _productService.GenerateBooks(count, userId);
        //    return Ok();
        //}

        //[HttpDelete("books")]
        //[Authorize]
        //public ActionResult ClearBooks()
        //{
        //    var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
        //    _productService.ClearBooks(userId);
        //    return Ok();
        //}
    }
}
