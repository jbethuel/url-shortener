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
    public async Task<IActionResult> Get([FromQuery] int page)
    {
        string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)!.Value;

        var result = await _linkService.GetAllByUserId(userId, page, 50);

        return Ok(new BaseResponse(MessageType.Success, result));
    }

    [HttpGet]
    [Route("get/{id}")]
    [Authorize("shortener-api")]
    public async Task<ActionResult<Link>> Get(string id)
    {
        var link = await _linkService.GetOneByUserId(id);

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
        string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)!.Value;

        var result = await _linkService.CreateOne(payload.Path, userId);
        if (result is null)
        {
            return Ok(new BaseResponse(MessageType.Rejected, null));
        }

        return Ok(new BaseResponse(MessageType.Success, result));
    }
}
