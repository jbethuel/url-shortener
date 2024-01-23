using System.Text.RegularExpressions;

namespace api.Utils;

public class LinkUtility
{
    private readonly string _link;

    public LinkUtility(string link)
    {
        _link = link;
    }

    public bool IsValidLink()
    {
        string Pattern =
            @"^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$";
        Regex Rgx = new(Pattern, RegexOptions.Compiled | RegexOptions.IgnoreCase);
        return Rgx.IsMatch(_link);
    }
}
