using Xunit;

namespace api.Tests
{
    public class LinkServiceTest
    {
        private readonly LinkUtility _linkUtility;

        public LinkServiceTest()
        {
            _linkUtility = new LinkUtility();
        }

        [Theory]
        [InlineData("https://fb.com")]
        [InlineData("https://reddit.com")]
        [InlineData("https://jbethuel.com")]
        public void IsValidLink(string link)
        {
            var result = _linkUtility.IsValidLink(link);
            Assert.True(result);
        }

        [Theory]
        [InlineData("the quick brown fox")]
        public void IsInvalidLink(string link)
        {
            var result = _linkUtility.IsValidLink(link);
            Console.WriteLine(result);
            Assert.False(result);
        }
    }
}
