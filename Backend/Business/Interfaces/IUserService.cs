using Business.DTOs;

namespace Business.Interfaces
{
    public interface IUserService
    {
        public List<UserDTO> GetAll();
        public UserDTO? GetByEmail(string email);
        public void Add(UserDTO user);
        public void AddSongToUserPlaylist(string email, SongDTO song);
        public List<SongDTO> GetUserPlaylist(string email);
        public void UpdateSongInUserPlaylist(string email, SongDTO song);
    }
}
