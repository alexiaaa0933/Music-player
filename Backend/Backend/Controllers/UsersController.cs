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
