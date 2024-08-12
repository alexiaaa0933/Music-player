
using AutoMapper;
using Business.DTOs;
using Business.Interfaces;
using DataAccess.Entities;
using DataAccess.Interfaces;

namespace Business.Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public void Add(UserDTO user)
        {
            var userEntity = _mapper.Map<User>(user);
            _userRepository.Add(userEntity);
        }

        public void AddSongToUserPlaylist(string email, SongDTO song)
        {
            var songEntity = _mapper.Map<Song>(song);
            _userRepository.AddSongToUserPlaylist(email, songEntity);
        }

        public List<UserDTO> GetAll()
        {
            var users = _userRepository.GetAll();
            return _mapper.Map<List<UserDTO>>(users);
        }

        public UserDTO? GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);
            return _mapper.Map<UserDTO>(user);
        }

        public List<SongDTO> GetUserPlaylist(string email)
        {
            var songs = _userRepository.GetUserPlaylist(email);
            return _mapper.Map<List<SongDTO>>(songs);
        }

        public void UpdateSongInUserPlaylist(string email, SongDTO song)
        {
            var songEntity = _mapper.Map<Song>(song);
            _userRepository.UpdateSongInUserPlaylist(email, songEntity);
        }
    }
}
