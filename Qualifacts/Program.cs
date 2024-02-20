using AspNetCoreRateLimit;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Qualifacts.Api.Extensions;
using Qualifacts.Entities.ConfigurationModels;
using Qualifacts.Presentation.ActionFilters;
using Qualifacts.Repository;
using Qualifacts.Service.Contracts;

namespace Qualifacts
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers(config =>
            {
                config.RespectBrowserAcceptHeader = true;
                config.ReturnHttpNotAcceptable = true;
                config.CacheProfiles.Add("120SecondsDuration", new CacheProfile { Duration = 120 });
            }).AddXmlDataContractSerializerFormatters()
  .AddApplicationPart(typeof(Presentation.AssemblyReference).Assembly);


            var generalConfiguration = new GeneralConfiguration();

            builder.Configuration.Bind(generalConfiguration.Section, generalConfiguration);
            // Add services to the container.
            builder.Services.ConfigureCors(builder.Configuration);

            builder.Services.ConfigureIISIntegration();

            builder.Host.ConfigureSerilog();

            builder.Services.ConfigureLoggerService();

            builder.Services.ConfigureSqlContext(builder.Configuration);

            builder.Services.ConfigureRepositoryManager();

            builder.Services.ConfigureServiceManager();

            builder.Services.ConfigureDataProtection(builder.Environment);

            builder.Services.AddAutoMapper(typeof(Program));

            builder.Services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            builder.Services.AddScoped<ValidationFilterAttribute>();

            builder.Services.AddMemoryCache();

            builder.Services.ConfigureRateLimitingOptions();

            builder.Services.AddHttpContextAccessor();

            builder.Services.AddAuthentication();

            builder.Services.ConfigureIdentity();

            builder.Services.ConfigureJWT(builder.Configuration);

            builder.Services.AddHttpClient();

            builder.Services.AddControllers(config =>
            {
                config.RespectBrowserAcceptHeader = true;
                config.ReturnHttpNotAcceptable = true;
            }).AddXmlDataContractSerializerFormatters()
  .AddApplicationPart(typeof(Presentation.AssemblyReference).Assembly);

            var app = builder.Build();
            // Configure the HTTP request pipeline.
            //Execute migrations
            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<RepositoryContext>();
                dbContext.Database.Migrate();
            }

            var logger = app.Services.GetRequiredService<ILoggerManager>();

            app.ConfigureExceptionHandler(logger);

            if (app.Environment.IsProduction())
                app.UseHsts();

            //app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.All
            });

            app.UseIpRateLimiting();

            app.UseCors(generalConfiguration.CorsPolicyName!);

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}