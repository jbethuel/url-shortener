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
        var userId = user.Id;

        try
        {
            var links = await _linkService.GetAllByUserId(userId, page, 50);
            var total = _linkService.CountAllByUserId(userId);
            return Ok(new BaseResponse(ResponseType.Success, null, new { total, links }));
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
        var userId = user.Id;

        try
        {
            var result = await _linkService.FindOneByIdAndUserId(id, userId);

            return Ok(new BaseResponse(ResponseType.Success, null, result));
        }
        catch (Exception)
        {
            return Ok(new BaseResponse(ResponseType.Error, null, null));
        }
    }

    [HttpPatch]
    [Route("update/{id}")]
    [Authorize("shortener-api")]
    public async Task<ActionResult<Link>> Patch(string id, LinkPostInput payload)
    {
        var user = new UserService(User);
        var userId = user.Id;

        try
        {
            var result = await _linkService.FindOneByIdAndUserId(id, userId);
            if (result is null)
            {
                throw new Exception();
            }

            await _linkService.PatchOne(id, payload);
            var updatedResult = await _linkService.FindOneById(id);
            if (updatedResult is null)
            {
                throw new Exception();
            }

            return Ok(new BaseResponse(ResponseType.Success, null, updatedResult));
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

    [HttpDelete]
    [Route("delete")]
    [Authorize("shortener-api")]
    public async Task<IActionResult> Delete(string id)
    {
        var user = new UserService(User);

        try
        {
            var result = await _linkService.DeleteOne(id, user.Id);
            if (result == false)
            {
                return Ok(new BaseResponse(ResponseType.Rejected, null, null));
            }

            return Ok(new BaseResponse(ResponseType.Success, null, result));
        }
        catch (Exception) { }

        return Ok(new BaseResponse(ResponseType.Rejected, null, null));
    }
}
