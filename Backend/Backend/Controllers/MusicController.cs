using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using TagLib;

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
                string[] albumAndImage = tagFile.Tag.Album.Split('~');
                return new Song
                {
                    FileName = Path.GetFileName(file),
                    CreationDate = System.IO.File.GetCreationTime(file),
                    Album = albumAndImage[0],
                    Title = tagFile.Tag.Title,
                    Author = tagFile.Tag.Artists[0],
                    Genre = tagFile.Tag.FirstGenre,
                    Duration = tagFile.Properties.Duration,
                    ImageUrl = albumAndImage[1]
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

        private T GetCustomMetadata<T>(TagLib.File tagFile, string fieldName, Func<string, T> converter, T defaultValue = default)
        {
            var tag = tagFile.GetTag(TagTypes.Id3v2) as TagLib.Id3v2.Tag;

            if (tag != null)
            {
                var customFrames = tag.GetFrames<TagLib.Id3v2.TextInformationFrame>();

                foreach (var frame in customFrames)
                {
                    
                    if (frame.Text != null && frame.Text.Any(t => t.StartsWith(fieldName + ":", StringComparison.OrdinalIgnoreCase)))
                    {
                        var fieldValue = frame.Text.First(t => t.StartsWith(fieldName + ":")).Substring(fieldName.Length + 1).Trim();
                        try
                        {
                            return converter(fieldValue);
                        }
                        catch
                        {
                            return defaultValue;
                        }
                    }
                }
            }

            return defaultValue; 
        }

    }
}
