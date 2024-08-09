using Newtonsoft.Json;
using DataAccess.Entities;
using DataAccess.Interfaces;

namespace DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private static List<User> _users = new List<User>();
        private readonly string _usersFilePath = "../DataAccess/Files/users.json";
        public UserRepository()
        {
            _users = LoadUsersFromFile(_usersFilePath);
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
        public List<User> GetAll()
        {
            return _users;
        }
        public User? GetByEmail(string email)
        {
            return _users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
        }
        public void Add(User user)
        {
            _users.Add(user);
            SaveUsersToFile(_usersFilePath, _users);
        }
        public void AddSongToUserPlaylist(string email, Song song)
        {
            var user = _users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
            if (user != null)
            {
                var songInPlaylist = user.Playlist.FirstOrDefault(s => s.FileName.Equals(song.FileName, StringComparison.OrdinalIgnoreCase));
                if (songInPlaylist != null)
                {
                    user.Playlist.Remove(songInPlaylist);
                }
                else
                {
                    user.Playlist.Add(song);
                }

                SaveUsersToFile(_usersFilePath, _users);
            }
        }
        public List<Song> GetUserPlaylist(string email)
        {
            var user = _users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
            if (user != null)
            {
                return user.Playlist;
            }
            return new List<Song>();
        }
        public void UpdateSongInUserPlaylist(string email, Song song)
        {
            foreach (var usr in _users)
            {
                var songInPlaylistIndex = usr.Playlist.FindIndex(s => s.FileName.Equals(song.FileName, StringComparison.OrdinalIgnoreCase));
                if (songInPlaylistIndex != -1)
                {
                    usr.Playlist[songInPlaylistIndex] = song;
                }
            }

            SaveUsersToFile(_usersFilePath, _users);
        }
        private void SaveUsersToFile(string filePath, List<User> users)
        {
            var jsonData = JsonConvert.SerializeObject(users, Newtonsoft.Json.Formatting.Indented);
            System.IO.File.WriteAllText(filePath, jsonData);
        }
    }
}
