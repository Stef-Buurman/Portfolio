using Portfolio.Server.Models;
using Portfolio.Server.Services;
using TypedApi.Swagger;

var builder = WebApplication.CreateBuilder(args);

var contactListAuthorization = builder.Environment.IsDevelopment()
    ? builder.Configuration["ContactListFilter:Authorization"]
    : ReadSystemdCredential("contact-list-authorization");

if (string.IsNullOrWhiteSpace(contactListAuthorization))
{
    throw new InvalidOperationException(
        builder.Environment.IsDevelopment()
            ? "ContactListFilter:Authorization was not configured in appsettings.Development.json."
            : "The systemd credential 'contact-list-authorization' was not configured.");
}

builder.Configuration["ContactListFilter:Authorization"] = contactListAuthorization;

builder.Services
    .AddControllers()
    .AddTypedApiJsonOptions();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddTypedApiSwagger();

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.Lax;
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<ContactService>();
builder.Services.AddScoped<AuthorizationService>();
builder.Services.Configure<ContactListOptions>(
    builder.Configuration.GetSection("ContactListFilter"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
}

app.UseHttpsRedirection();
app.UseSession();
app.UseAuthorization();

app.MapControllers();

if (!app.Environment.IsDevelopment())
{
    app.MapFallbackToFile("index.html");
}

app.Run();

static string? ReadSystemdCredential(string credentialName)
{
    var credentialsDirectory = Environment.GetEnvironmentVariable("CREDENTIALS_DIRECTORY");

    if (string.IsNullOrWhiteSpace(credentialsDirectory))
    {
        return null;
    }

    var credentialPath = Path.Combine(credentialsDirectory, credentialName);

    if (!File.Exists(credentialPath))
    {
        return null;
    }

    var credentialValue = File.ReadAllText(credentialPath).TrimEnd('\r', '\n');

    return string.IsNullOrWhiteSpace(credentialValue)
        ? null
        : credentialValue;
}
