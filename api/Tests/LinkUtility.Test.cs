using Xunit;
using api.Utils;

namespace api.Tests
{
    public class LinkServiceTest
    {
        [Theory]
        [InlineData("https://fb.com")]
        [InlineData("https://reddit.com")]
        [InlineData("https://jbethuel.com")]
        public void IsValidLink(string link)
        {
            var result = new LinkUtility(link).IsValidLink();
            Assert.True(result);
        }

        [Theory]
        [InlineData("the quick brown fox")]
        public void IsInvalidLink(string link)
        {
            var result = new LinkUtility(link).IsValidLink();
            Console.WriteLine(result);
            Assert.False(result);
        }
    }
}
