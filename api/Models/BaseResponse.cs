namespace api.Models;

public enum MessageType
{
    Success,
    Failure,
}

public class BaseResponse
{
    public string Message { get; set; }
    public object? Data { get; set; }

    public BaseResponse(MessageType message, object? data)
    {
        Message = message.ToString();
        Data = data;
    }
}
