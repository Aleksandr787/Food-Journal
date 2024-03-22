using Food_Journal.Contracts;
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
    }
}
