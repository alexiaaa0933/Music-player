using Business.Interfaces;
using DataAccess.Entities;
using DataAccess.Interfaces;
using Business.Exceptions;

namespace Business.Services
{
    public class SongService : ISongService
    {
        private ISongRepository _songRepository;
        public SongService(ISongRepository songRepository)
        {
            _songRepository = songRepository;
        }

        public List<Song> GetAll()
        {
            List<Song>? songs = _songRepository.GetAll();
            if (songs.Count == 0)
            {
                throw new NoAvailableSongsException();
            }
            return songs;
        }

        public List<Song>? GetByAlbum(string album)
        {
            List<Song>? song = _songRepository.GetByAlbum(album);
            if (song == null)
            {
                throw new NoSongsByAlbumException(album);
            }
            return song;
        }

        public List<Song>? GetTopLikedSongs()
        {
           var topLikedSongs =  _songRepository.GetAll().OrderByDescending(song => song.Likes).Take(5).ToList();
           return topLikedSongs;
        }

        public List<Song>? GetByAuthor(string author)
        {
            var songsByAuthor = _songRepository.GetByAuthor(author);
            if (songsByAuthor == null)
            {
                throw new NoSongsByAuthorException(author);
            }
            return songsByAuthor;
        }

        public Song? GetByTitle(string title)
        {
            Song? song = _songRepository.GetByTitle(title);
            return song;
        }

        public void Update(Song song)
        {
            _songRepository.Update(song);
        }

        public void LikeSong(string songName, string userEmail)
        {
            var song = _songRepository.GetByTitle(songName);
            if (song != null)
            {
                if (!song.UsersWhoLiked.Contains(userEmail))
                {
                    song.UsersWhoLiked.Add(userEmail);
                    song.Likes++;
                }
                else
                {
                    song.UsersWhoLiked.Remove(userEmail);
                    song.Likes--;
                }

                _songRepository.Update(song);
            }
        }

        public FileStream GetFileStream(string fileName)
        {
            return _songRepository.StreamSong(fileName);
        }
    }
}
