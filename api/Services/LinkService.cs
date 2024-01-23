using api.Models;
using api.Utils;
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

    public async Task<Link?> GetOneByPath(string path)
    {
        return await _linksCollection.Find(doc => doc.Path == path).FirstOrDefaultAsync();
    }

    public async Task<Link?> FindOneById(string id)
    {
        return await _linksCollection.Find(doc => doc.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Link?> FindOneByIdAndUserId(string id, string userId)
    {
        return await _linksCollection
            .Find(x => x.Id == id && x.UserId == userId)
            .FirstOrDefaultAsync();
    }

    public long CountAllByUserId(string userId)
    {
        return _linksCollection.CountDocuments(e => e.UserId == userId);
    }

    public async Task<Link?> CreateOne(string path, string url, string userId)
    {
        var isValid = new LinkUtility(url).IsValidLink();
        if (isValid == false)
        {
            throw new Exception();
        }

        var id = ObjectId.GenerateNewId().ToString();

        await _linksCollection.InsertOneAsync(
            new Link
            {
                Id = id,
                Path = path,
                UserId = userId,
                Url = url
            }
        );

        return await FindOneByIdAndUserId(id, userId);
    }

    public async Task<Link?> PatchOne(string id, LinkPostInput payload)
    {
        var filter = Builders<Link>.Filter.Eq(link => link.Id, id);

        var update = Builders<Link>.Update
            .Set(link => link.Path, payload.Path)
            .Set(link => link.Url, payload.Url);

        await _linksCollection.UpdateOneAsync(filter, update);
        return await FindOneById(id);
    }

    public async Task<bool> DeleteOne(string id, string userId)
    {
        var result = await FindOneByIdAndUserId(id, userId);
        if (result is null)
        {
            return false;
        }

        var filter = Builders<Link>.Filter.Eq(link => link.Id, result.Id);
        var deleteResult = await _linksCollection.DeleteOneAsync(filter);
        if (deleteResult.DeletedCount < 0)
        {
            return false;
        }

        return true;
    }
}
