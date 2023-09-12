using api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Services;

public class LinkService
{
    private readonly IMongoCollection<Link> _linksCollection;

    public LinkService(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

        _linksCollection = mongoDatabase.GetCollection<Link>("links");
    }

    public async Task<List<Link>> GetAllByUserId(string userId, int? page, int? pageSize)
    {
        if (page is null && pageSize is null)
        {
            return await _linksCollection.Find(e => e.UserId == userId).ToListAsync();
        }

        var defaultPage = page < 1 ? 1 : page;

        return await _linksCollection
            .Find(e => e.UserId == userId)
            .Skip((defaultPage - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync();
    }

    public async Task<Link?> GetOneByUserId(string id)
    {
        return await _linksCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Link?> CreateOne(string path, string userId)
    {
        var id = ObjectId.GenerateNewId().ToString();

        await _linksCollection.InsertOneAsync(
            new Link
            {
                Id = id,
                Path = path,
                UserId = userId
            }
        );

        return await GetOneByUserId(id);
    }
}
