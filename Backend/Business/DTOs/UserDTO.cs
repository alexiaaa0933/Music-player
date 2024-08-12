using DataAccess.Entities;

namespace Business.DTOs
{
    public class UserDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Song> Playlist { get; set; } = new List<Song>();
    }
}
