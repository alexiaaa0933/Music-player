using Backend.Exceptions;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private static List<User> _users = new List<User>();
        private readonly string _usersFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Files/users.json");


        public UsersController()
        {
            _users = LoadUsersFromFile(_usersFilePath);
        }

        [HttpGet("users")]
        public IActionResult ListFiles()
        {
            if (_users.Count == 0)
            {
                throw new NoAvailableSongsException();
            }
            return Ok(_users);
        }

        [HttpGet("user")]
        public IActionResult GetUserByEmail([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email parameter is required.");
            }

            var user = _users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }

        [HttpPut("addUser")]
        public IActionResult AddUser([FromBody] User newUser)
        {
            if (newUser == null || string.IsNullOrEmpty(newUser.Name) || string.IsNullOrEmpty(newUser.Email) || string.IsNullOrEmpty(newUser.Password))
            {
                return BadRequest("Invalid user data.");
            }

            var existingUser = _users.FirstOrDefault(u => u.Email.Equals(newUser.Email, StringComparison.OrdinalIgnoreCase));
            if (existingUser != null)
            {
                return Conflict("Email is already in use.");
            }

            _users.Add(newUser);
            SaveUsersToFile(_usersFilePath, _users);
            return Ok(newUser);
        }


        [HttpPost("addSongToUserPlaylist/{email}")]
        public IActionResult AddSongToUserPlaylist(string email, [FromBody] Song newSong)
        {
            if (string.IsNullOrEmpty(email) || newSong == null)
            {
                return BadRequest("Invalid request data.");
            }

            var user = _users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var songInPlaylist = user.Playlist.FirstOrDefault(s => s.FileName.Equals(newSong.FileName, StringComparison.OrdinalIgnoreCase));
            if (songInPlaylist != null)
            {
                user.Playlist.Remove(songInPlaylist);
            }
            else
            {
                user.Playlist.Add(newSong);
            }

            SaveUsersToFile(_usersFilePath, _users);

            return Ok(newSong);
        }


        [HttpGet("userPlaylist/{email}")]
        public IActionResult GetUserPlaylist(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email parameter is required.");
            }

            var user = _users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user.Playlist);
        }

        [HttpPost("updateSongInUserPlaylist/{email}")]
        public IActionResult UpdateSongInUserPlaylist(string email, [FromBody] Song updatedSong)
        {
            if (updatedSong == null)
            {
                return BadRequest("Invalid request data.");
            }

            foreach (var usr in _users)
            {
                var songInPlaylistIndex = usr.Playlist.FindIndex(s => s.FileName.Equals(updatedSong.FileName, StringComparison.OrdinalIgnoreCase));
                if (songInPlaylistIndex != -1)
                {
                    usr.Playlist[songInPlaylistIndex] = updatedSong;
                }
            }

            SaveUsersToFile(_usersFilePath, _users);

            return Ok(updatedSong);
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginUser)
        {
            var user = _users.FirstOrDefault(u => u.Email == loginUser.Email && u.Password == loginUser.Password);
            if (user == null)
            {
                return Unauthorized("This account is not valid.");
            }

            return Ok(new { message = "Login successful." });
        }

        private void SaveUsersToFile(string filePath, List<User> users)
        {
            var jsonData = JsonConvert.SerializeObject(users, Newtonsoft.Json.Formatting.Indented);
            System.IO.File.WriteAllText(filePath, jsonData);
        }
        private List<User> LoadUsersFromFile(string filePath)
        {
            if (System.IO.File.Exists(filePath))
            {
                var jsonData = System.IO.File.ReadAllText(filePath);
                return JsonConvert.DeserializeObject<List<User>>(jsonData);
            }
            return new List<User>();
        }
    }
}
