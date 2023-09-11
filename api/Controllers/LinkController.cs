using System.Security.Claims;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/link")]
public class LinkController : ControllerBase
{
    private readonly LinkService _linkService;

    public LinkController(LinkService linkService)
    {
        _linkService = linkService;
    }

    [HttpGet]
    [Route("list")]
    [Authorize("shortener-api")]
    public async Task<List<Link>> Get()
    {
        return await _linkService.ListAsync();
    }

    [HttpGet]
    [Route("get/{id}")]
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
    [Route("create")]
    [Authorize("shortener-api")]
    public async Task<IActionResult> Post(LinkPostInput payload)
    {
        string? userId = User.Claims
            .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
            ?.Value;

        if (userId is null)
        {
            return Unauthorized();
        }

        var result = await _linkService.CreateAsync(payload.Path, userId);
        if (result.Item2 is null)
        {
            return Ok(new BaseResponse(MessageType.Rejected, null));
        }

        return Ok(new BaseResponse(MessageType.Success, result.Item2));
    }
}
