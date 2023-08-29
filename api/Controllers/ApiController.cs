using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api")]
public class ApiController : Controller
{
    [HttpGet("private-scoped")]
    [Authorize("shortener-api")]
    public IActionResult Scoped()
    {
        return Ok(
            new
            {
                Message = "Hello from a private endpoint! You need to be authenticated and have a scope of read to see this."
            }
        );
    }
}
