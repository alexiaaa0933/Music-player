using Business.Interfaces;
using DataAccess.Entities;
using DataAccess.Interfaces;
using Business.Exceptions;
using Business.Mappers;
using AutoMapper;
using Business.DTOs;

namespace Business.Services
{
    public class SongService : ISongService
    {
        private IMapper _mapper;
        private ISongRepository _songRepository;
        public SongService(ISongRepository songRepository, IMapper mapper)
        {
            _songRepository = songRepository;
            _mapper = mapper;
        }

        public List<SongDTO> GetAll()
        {
            List<Song>? songs = _songRepository.GetAll();
            if (songs.Count == 0)
            {
                throw new NoAvailableSongsException();
            }
            var songDTOs = new List<SongDTO>();
            foreach (var song in songs)
            {
                songDTOs.Add(_mapper.Map<SongDTO>(song));
            }
            return songDTOs;
        }

        public List<SongDTO>? GetByAlbum(string album)
        {
            List<Song>? song = _songRepository.GetByAlbum(album);
            if (song == null || song.Count == 0)
            {
                throw new NoSongsByAlbumException();
            }
            var albumSongs = new List<SongDTO>();
            foreach (var s in song)
            {
                albumSongs.Add(_mapper.Map<SongDTO>(s));
            }
            return albumSongs;
        }

        public List<SongDTO>? GetTopLikedSongs()
        {
            var topLikedSongs = _songRepository.GetAll().OrderByDescending(song => song.Likes).Take(5).ToList();
            var topLikedSongsDTO = new List<SongDTO>();
            foreach (var song in topLikedSongs)
            {
                topLikedSongsDTO.Add(_mapper.Map<SongDTO>(song));
            }
            return topLikedSongsDTO;
        }

        public List<SongDTO>? GetByAuthor(string author)
        {
            var songsByAuthor = _songRepository.GetByAuthor(author);
            if (songsByAuthor == null || songsByAuthor.Count == 0)
            {
                throw new NoSongsByAuthorException(author);
            }
            var songs = new List<SongDTO>();
            foreach (var song in songsByAuthor)
            {
                songs.Add(_mapper.Map<SongDTO>(song));
            }
            return songs;
        }


        public void Update(SongDTO songDto)
        {
            var song = _mapper.Map<Song>(songDto);
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
