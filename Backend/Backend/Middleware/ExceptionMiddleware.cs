using System.Net.Mime;
using System.Net;
using System.Text.Json;
using Backend.Exceptions;

namespace Backend.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (SongNotFoundException ex)
            {
                await HandleCustomExceptionResponseAsync(context, ex, HttpStatusCode.NotFound);
            }
            catch (NoAvailableSongsException ex)
            {
                await HandleCustomExceptionResponseAsync(context, ex, HttpStatusCode.InternalServerError);
            }
            catch (NoSongsByAuthorException ex)
            {
                await HandleCustomExceptionResponseAsync(context, ex, HttpStatusCode.NotFound);
            }
            catch (NoSongsByAlbumException ex)
            {
                await HandleCustomExceptionResponseAsync(context, ex, HttpStatusCode.NotFound);
            }
            catch (Exception ex)
            {
                await HandleCustomExceptionResponseAsync(context, ex);
            }
        }

        private async Task HandleCustomExceptionResponseAsync(HttpContext context, Exception ex, HttpStatusCode httpStatusCode = HttpStatusCode.InternalServerError)
        {
            context.Response.ContentType = MediaTypeNames.Application.Json;
            context.Response.StatusCode = (int)httpStatusCode;

            var response = new ErrorModel(context.Response.StatusCode, ex.Message);
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, options);
            await context.Response.WriteAsync(json);
        }
    }
}
