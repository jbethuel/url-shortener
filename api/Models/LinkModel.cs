using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Models;

public class Link
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; } = null!;

    [BsonElement("path")]
    public required string Path { get; set; } = null!;

    [BsonElement("user_id")]
    public required string UserId { get; set; } = null!;

    [BsonElement("url")]
    public required string Url { get; set; } = null!;
}
