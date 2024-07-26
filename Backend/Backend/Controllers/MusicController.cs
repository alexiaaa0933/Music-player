using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MusicController : ControllerBase
    {
        private readonly string _musicDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Music");

        private static List<Song> _songs = new List<Song>();

        public MusicController()
        {
            InitializeSongs();
        }

        private void InitializeSongs()
        {
            var files = Directory.GetFiles(_musicDirectory, "*.mp3");

            foreach (var file in files)
            {
                var tagFile = TagLib.File.Create(file);
                var existingSong = _songs.FirstOrDefault(s => s.FileName == Path.GetFileName(file));

                if (existingSong == null)
                {
                    _songs.Add(new Song
                    {
                        FileName = Path.GetFileName(file),
                        CreationDate = System.IO.File.GetCreationTime(file),
                        Album = tagFile.Tag.Album,
                        Title = tagFile.Tag.Title,
                        Author = tagFile.Tag.FirstPerformer ?? string.Join(", ", tagFile.Tag.Performers),
                        Genre = tagFile.Tag.FirstGenre,
                        Duration = (int)tagFile.Properties.Duration.TotalSeconds,
                        Likes = (int)tagFile.Tag.TrackCount
                    });
                }
            }
        }

        [HttpGet("list")]
        public IActionResult ListFiles()
        {
            return Ok(_songs);
        }

        [HttpGet("stream/{fileName}")]
        public IActionResult StreamFile(string fileName)
        {
            var filePath = Path.Combine(_musicDirectory, fileName);
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
        [HttpGet("byAuthor")]
        public IActionResult getSongsByAuthor(string author)
        {
            var files = Directory.GetFiles(_musicDirectory, "*.mp3");

            var authorFiles = files.Select(file =>
            {
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
            }).Where(song => song.Author != null &&
            song.Author.Contains(author, StringComparison.OrdinalIgnoreCase))
            .ToList();
            return Ok(authorFiles);
        }
        [HttpGet("byAlbum")]
        public IActionResult getSongsByAlbum(string album)
        {
            var files = Directory.GetFiles(_musicDirectory, "*.mp3");

            var authorFiles = files.Select(file =>
            {
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
            }).Where(song => song.Album != null &&
            song.Album.Contains(album, StringComparison.OrdinalIgnoreCase))
            .ToList();
            return Ok(authorFiles);
        }

        [HttpGet("top-liked")]
        public IActionResult GetTopLikedSongs()
        {
            var topLikedSongs = _songs.OrderByDescending(song => song.Likes).Take(5).ToList();
            return Ok(topLikedSongs);
        }

        [HttpPost("like/{fileName}")]
        public IActionResult LikeSong(string fileName)
        {
            var song = _songs.FirstOrDefault(s => s.FileName.Equals(fileName, System.StringComparison.OrdinalIgnoreCase));
            if (song != null)
            {
                song.Likes++;
                var updateResult = UpdateMetadataForSong(song);

                if (!updateResult.IsSuccess)
                {
                    return StatusCode(500, updateResult.ErrorMessage);
                }

                return Ok(song);    
            }
            return NotFound();
        }

        private (bool IsSuccess, string ErrorMessage) UpdateMetadataForSong(Song song)
        {
            var filePath = Path.Combine(_musicDirectory, song.FileName);
            if (System.IO.File.Exists(filePath))
            {
                try
                {
                    var file = TagLib.File.Create(filePath);
                    file.Tag.TrackCount = (uint)song.Likes;
                    file.Save();
                    return (true, string.Empty);
                }
                catch (Exception ex)
                {
                    return (false, $"Internal server error: {ex.Message}");
                }
            }
            return (false, "Song file not found.");
        }
    }
}
