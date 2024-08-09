
using Business.Interfaces;
using DataAccess.Entities;
using DataAccess.Interfaces;

namespace Business.Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public void Add(User user)
        {
            _userRepository.Add(user);
        }

        public void AddSongToUserPlaylist(string email, Song song)
        {
            _userRepository.AddSongToUserPlaylist(email, song);
        }

        public List<User> GetAll()
        {
            return _userRepository.GetAll();
        }

        public User? GetByEmail(string email)
        {
            return _userRepository.GetByEmail(email);
        }

        public List<Song> GetUserPlaylist(string email)
        {
            return _userRepository.GetUserPlaylist(email);
        }

        public void UpdateSongInUserPlaylist(string email, Song song)
        {
            _userRepository.UpdateSongInUserPlaylist(email, song);
        }
    }
}
