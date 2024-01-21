using System.Text.RegularExpressions;

namespace api.Tests;

public class LinkUtility
{
    public bool IsValidLink(string payload)
    {
        string Pattern =
            @"^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$";
        Regex Rgx = new(Pattern, RegexOptions.Compiled | RegexOptions.IgnoreCase);
        return Rgx.IsMatch(payload);
    }
}
