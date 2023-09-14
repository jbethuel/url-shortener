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
        var user = new UserService(User);

        try
        {
            var result = await _linkService.GetAllByUserId(user.Id, page, 50);
            return Ok(new BaseResponse(ResponseType.Success, null, result));
        }
        catch (Exception)
        {
            return Ok(new BaseResponse(ResponseType.Error, null, null));
        }
    }

    [HttpGet]
    [Route("get/{id}")]
    [Authorize("shortener-api")]
    public async Task<ActionResult<Link>> Get(string id)
    {
        var user = new UserService(User);

        try
        {
            var result = await _linkService.GetOneByUserId(id, user.Id);
            return Ok(new BaseResponse(ResponseType.Success, null, result));
        }
        catch (Exception)
        {
            return Ok(new BaseResponse(ResponseType.Error, null, null));
        }
    }

    [HttpPost]
    [Route("create")]
    [Authorize("shortener-api")]
    public async Task<IActionResult> Post(LinkPostInput payload)
    {
        var user = new UserService(User);

        try
        {
            var result = await _linkService.CreateOne(payload.Path, payload.Url, user.Id);
            if (result is null)
            {
                return Ok(new BaseResponse(ResponseType.Rejected, null, null));
            }

            return Ok(new BaseResponse(ResponseType.Success, null, result));
        }
        catch (Exception) { }

        return Ok(new BaseResponse(ResponseType.Rejected, null, null));
    }
}
