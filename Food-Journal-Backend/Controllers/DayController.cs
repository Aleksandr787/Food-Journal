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
    public class DayController : ControllerBase
    {
        private readonly DayService _dayService;

        public DayController(DayService dayService)
        {
            _dayService = dayService;
        }

        [HttpGet("days/{dateId:datetime}")]
        [Authorize]
        public ActionResult<Day> GetDay(DateTime dateId)
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            Day result = _dayService.GetDay(dateId, userId) ?? _dayService.AddDay(dateId, userId);

            return Ok(result);
        }

        [HttpPost("days/{dateId:datetime}")]
        [Authorize]
        public ActionResult<ProductItem> AddProductItem(DateTime dateId, ProductItemRequest productItemRequest)
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            var result = _dayService.AddProductItem(dateId, userId, productItemRequest);

            return Ok(result);
        }

        [HttpDelete("days/{dateId:datetime}/{productItemId:guid}")]
        [Authorize]
        public ActionResult DeleteProductItem(DateTime dateId, Guid productItemId)
        {
            var userId = RequestData.BindAsync(HttpContext).GetAwaiter().GetResult();
            var result = _dayService.DeleteProductItem(dateId, userId, productItemId);
            return Ok(result);
        }
    }
}
