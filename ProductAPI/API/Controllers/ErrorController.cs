using Microsoft.AspNetCore.Mvc;
using ProductAPI.API.Errors;

namespace ProductAPI.API.Controllers
{
    [Route("errors/{code}")]
    public class ErrorController : BaseApiController
    {
        [HttpGet]
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}
