using Microsoft.AspNetCore.Mvc;
using Business.Interfaces;
using Business.Exceptions;
using Business.DTOs;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MusicController : ControllerBase
    {
        private readonly ISongService _songService;
        public MusicController(ISongService songService)
        {
            _songService = songService;
        }

        [HttpGet("list")]
        public IActionResult ListFiles()
        {
            var _songs = _songService.GetAll();
            if (_songs.Count == 0)
            {
                throw new NoAvailableSongsException();
            }
            return Ok(_songs);
        }

        [HttpGet("stream/{fileName}")]
        public IActionResult StreamFile(string fileName)
        {
            var stream = _songService.GetFileStream(fileName);
            return new FileStreamResult(stream, "audio/mpeg")
            {
                EnableRangeProcessing = true
            };
        }

        [HttpGet("byAuthor/{author}")]
        public IActionResult getSongsByAuthor(string author)
        {
            var authorFiles = _songService.GetByAuthor(author);
            return Ok(authorFiles);
        }

        [HttpGet("byAlbum/{album}")]
        public IActionResult getSongsByAlbum(string album)
        {
            var albumFiles = _songService.GetByAlbum(album);
            return Ok(albumFiles);
        }
        private List<SongDTO> getArtistSongs(string author)
        {
            return _songService.GetByAuthor(author);
        }
        [HttpGet("artist-top-5/{artist}")]
        public IActionResult getTop5Artist(string artist)
        {
            var top5 = getArtistSongs(artist).OrderByDescending(song => song.Likes).Take(5).ToList();
            return Ok(top5);
        }

        [HttpGet("top-liked")]
        public IActionResult GetTopLikedSongs()
        {
            var topLikedSongs = _songService.GetTopLikedSongs();
            return Ok(topLikedSongs);
        }

        [HttpPost("like/{fileName}")]
        public void LikeSong(string fileName, [FromBody] string userEmail)
        {
           _songService.LikeSong(fileName, userEmail);
        }

    }
}
