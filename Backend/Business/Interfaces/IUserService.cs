using DataAccess.Entities;

namespace Business.Interfaces
{
    public interface IUserService
    {
        public List<User> GetAll();
        public User? GetByEmail(string email);
        public void Add(User user);
        public void AddSongToUserPlaylist(string email, Song song);
        public List<Song> GetUserPlaylist(string email);
        public void UpdateSongInUserPlaylist(string email, Song song);
    }
}
