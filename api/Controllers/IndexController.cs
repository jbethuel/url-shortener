using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("")]
public class IndexController : ControllerBase
{
    private readonly LinkService _linkService;

    public IndexController(LinkService linkService)
    {
        _linkService = linkService;
    }

    [HttpGet]
    [Route("/{path}")]
    public async Task<ActionResult<Link?>> Get(string path)
    {
        var link = await _linkService.GetOneByPath(path);
        if (link is null)
        {
            return NotFound();
        }

        string referer = Request.Headers["Referer"].ToString();
        if (!string.IsNullOrEmpty(referer) && referer.Contains("/swagger/"))
        {
            return Ok("Redirected to " + link.Url);
        }

        return Redirect(link.Url);
    }
}
