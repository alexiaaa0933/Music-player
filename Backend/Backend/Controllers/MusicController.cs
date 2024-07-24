using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MusicController : ControllerBase
    {
        private readonly string musicDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Music");

        [HttpGet("list")]
        public IActionResult ListFiles()
        {
            var files = Directory.GetFiles(musicDirectory, "*.mp3");

            var musicFiles = files.Select(file => {
                var tagFile = TagLib.File.Create(file);
                return new Song
                {
                    FileName = Path.GetFileName(file),
                    CreationDate = System.IO.File.GetCreationTime(file),
                    Album = tagFile.Tag.Album,
                    Title = tagFile.Tag.Title,
                    Author = tagFile.Tag.FirstPerformer ?? string.Join(", ", tagFile.Tag.Performers),
                    Genre = tagFile.Tag.FirstGenre
                };
            }).ToList();

            return Ok(musicFiles);
        }

        [HttpGet("stream/{fileName}")]
        public IActionResult StreamFile(string fileName)
        {
            var filePath = Path.Combine(musicDirectory, fileName);
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return new FileStreamResult(stream, "audio/mpeg")
            {
                EnableRangeProcessing = true
            };
        }
    }
}
