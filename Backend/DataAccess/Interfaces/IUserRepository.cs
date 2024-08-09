using DataAccess.Entities;
using Newtonsoft.Json;

namespace DataAccess.Interfaces
{
    public interface IUserRepository
    {
        public List<User> GetAll();
        public User? GetByEmail(string email);
        public void Add(User user);
        public void AddSongToUserPlaylist(string email, Song song);
        public List<Song> GetUserPlaylist(string email);
        public void UpdateSongInUserPlaylist(string email, Song song);
    }
}
