using api.Services;
using api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
var domain = $"https://{builder.Configuration["Auth0:Domain"]}/";
var audience = builder.Configuration["Auth0:Audience"];
var clientId = builder.Configuration["Auth0:ClientId"];
var scope = "shortener-api";

builder.Services.AddRouting(options =>
{
    options.LowercaseUrls = true;
    options.LowercaseQueryStrings = true;
});

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = domain;
        options.Audience = audience;
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(
        scope,
        policy => policy.Requirements.Add(new HasScopeRequirement(scope, domain))
    );
});

builder.Services.AddControllers();
builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc(
        "v1",
        new OpenApiInfo
        {
            Title = "API",
            Version = "v1",
            Description = "A REST API",
            TermsOfService = new Uri("https://lmgtfy.com/?q=i+like+pie")
        }
    );

    c.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.OAuth2,
            Flows = new OpenApiOAuthFlows
            {
                Implicit = new OpenApiOAuthFlow
                {
                    Scopes = new Dictionary<string, string> { { scope, scope }, },
                    AuthorizationUrl = new Uri(
                        domain + "authorize?audience=" + builder.Configuration["Auth0:Audience"]
                    )
                }
            }
        }
    );

    c.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<LinkService>();

var app = builder.Build();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(cors =>
{
    cors.AllowAnyOrigin();
    cors.AllowAnyHeader();
});

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.OAuthClientId(clientId);
});

app.MapGet(
    "/swagger",
    (context) =>
    {
        context.Response.Redirect("./swagger/index.html", permanent: true);
        return Task.FromResult(0);
    }
);
app.MapGet("/greet", () => "Hello World! " + DateTime.Now);
app.Run();
