using api.Models;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LinkController : ControllerBase
{
    private readonly LinkService _linkService;

    public LinkController(LinkService linkService) => _linkService = linkService;

    [HttpGet]
    [Authorize("shortener-api")]
    public async Task<List<Link>> Get() => await _linkService.GetAsync();

    [HttpGet("{id}")]
    [Authorize("shortener-api")]
    public async Task<ActionResult<Link>> Get(string id)
    {
        var link = await _linkService.GetAsync(id);

        if (link is null)
        {
            return NotFound();
        }

        return link;
    }

    [HttpPost]
    [Authorize("shortener-api")]
    public async Task<IActionResult> Post(Link newLink)
    {
        await _linkService.CreateAsync(newLink);

        return CreatedAtAction(nameof(Get), new { id = newLink.Id }, newLink);
    }
}
