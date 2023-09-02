using api.Models;
using Microsoft.Extensions.Options;
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

    public async Task<List<Link>> GetAsync() =>
        await _linksCollection.Find(_ => true).ToListAsync();

    public async Task<Link?> GetAsync(string id) =>
        await _linksCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Link newLink) => await _linksCollection.InsertOneAsync(newLink);

    public async Task UpdateAsync(string id, Link updatedLink) =>
        await _linksCollection.ReplaceOneAsync(x => x.Id == id, updatedLink);

    public async Task RemoveAsync(string id) =>
        await _linksCollection.DeleteOneAsync(x => x.Id == id);
}
