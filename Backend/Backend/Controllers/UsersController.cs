using Business.DTOs;
using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet("users")]
        public IActionResult ListFiles()
        {
            var _users = _userService.GetAll();
            return Ok(_users);
        }

        [HttpGet("user")]
        public IActionResult GetUserByEmail([FromQuery] string email)
        {
            var user = _userService.GetByEmail(email);
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email parameter is required.");
            }
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
        }

        [HttpPut("addUser")]
        public IActionResult AddUser([FromBody] UserDTO newUser)
        {

            if (newUser == null || string.IsNullOrEmpty(newUser.Name) || string.IsNullOrEmpty(newUser.Email) || string.IsNullOrEmpty(newUser.Password))
            {
                return BadRequest("Invalid user data.");
            }

            var existingUser = _userService.GetAll().FirstOrDefault(u => u.Email.Equals(newUser.Email, StringComparison.OrdinalIgnoreCase));
            if (existingUser != null)
            {
                return Conflict("Email is already in use.");
            }

            _userService.Add(newUser);
            return Ok(newUser);
        }


        [HttpPost("addSongToUserPlaylist/{email}")]
        public IActionResult AddSongToUserPlaylist(string email, [FromBody] SongDTO newSong)
        {
            if (newSong == null)
            {
                return BadRequest("Invalid request data.");
            }

            _userService.AddSongToUserPlaylist(email, newSong);

            return Ok(newSong);
        }


        [HttpGet("userPlaylist/{email}")]
        public IActionResult GetUserPlaylist(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email parameter is required.");
            }

            var userPlaylist = _userService.GetUserPlaylist(email);
            return Ok(userPlaylist);
        }

        [HttpPost("updateSongInUserPlaylist/{email}")]
        public IActionResult UpdateSongInUserPlaylist(string email, [FromBody] SongDTO updatedSong)
        {
            if (updatedSong == null)
            {
                return BadRequest("Invalid request data.");
            }

            _userService.UpdateSongInUserPlaylist(email, updatedSong);

            return Ok(updatedSong);
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] UserDTO loginUser)
        {
            var user = _userService.GetAll().FirstOrDefault(u => u.Email == loginUser.Email && u.Password == loginUser.Password);
            if (user == null)
            {
                return Unauthorized("This account is not valid.");
            }

            return Ok(new { message = "Login successful." });
        }

    }
}
