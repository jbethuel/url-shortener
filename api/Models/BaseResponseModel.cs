namespace api.Models;

public enum ResponseType
{
    Success,
    Rejected,
    Error
}

public class BaseResponse
{
    public string Type { get; set; }
    public string? Message { get; set; }
    public object? Data { get; set; }

    public BaseResponse(ResponseType responseType, string? message, object? data)
    {
        Type = responseType.ToString();
        Message = message;
        Data = data;
    }
}
