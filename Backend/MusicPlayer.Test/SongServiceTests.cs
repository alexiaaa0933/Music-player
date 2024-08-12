using AutoMapper;
using Business.DTOs;
using Business.Exceptions;
using Business.Mappers;
using Business.Services;
using DataAccess.Entities;
using DataAccess.Interfaces;
using Moq;

namespace MusicPlayer.Test
{
    [TestClass]
    public class SongServiceTests
    {
        private Mock<ISongRepository> mockSongRepository;
        private Mock<IMapper> mapper;
        private SongService songService;

        public SongServiceTests()
        {
            mockSongRepository = new Mock<ISongRepository>();
            mapper = new Mock<IMapper>();
            mapper.Setup(x => x.Map<SongDTO>(It.IsAny<Song>())).Returns(new SongDTO());
            mapper.Setup(x => x.Map<Song>(It.IsAny<SongDTO>())).Returns(new Song());

            songService = new SongService(mockSongRepository.Object, mapper.Object);
        }

        [TestMethod]
        public  void GetAllWhenAvailableSongs()
        {
            // Arrange
            var song = new Song
            {
                FileName = "test.mp3",
                CreationDate = DateTime.Now,
                Album = "Test Album",
                Title = "Test Title",
                Author = "Test Author",
                Genre = "Test Genre",
                Likes = 0,
                Duration = 0,
                ImageURL = "test.jpg",
                UsersWhoLiked = new List<string>()
            };
            mockSongRepository.Setup(x => x.GetAll()).Returns(new List<Song> { song });

            // Act
            var result = songService.GetAll();


            // Assert
            Assert.AreEqual(1, result.Count);
        }

        [TestMethod]
        public void GetAllWhenNotAvailableSongs()
        {
            // Arrange
            mockSongRepository.Setup(x => x.GetAll()).Returns(new List<Song>());

            //Act

            // Assert
            Assert.ThrowsException<NoAvailableSongsException>(() => songService.GetAll());
        }

        [TestMethod]
        public void GetByAlbumWhenAvailableSongs()
        {
            // Arrange
            var song = new Song
            {
                FileName = "test.mp3",
                CreationDate = DateTime.Now,
                Album = "Test Album",
                Title = "Test Title",
                Author = "Test Author",
                Genre = "Test Genre",
                Likes = 0,
                Duration = 0,
                ImageURL = "test.jpg",
                UsersWhoLiked = new List<string>()
            };
            mockSongRepository.Setup(x => x.GetByAlbum("Test Album")).Returns(new List<Song> { song });

            // Act
            var result = songService.GetByAlbum("Test Album");

            // Assert
            Assert.AreEqual(1, result.Count);
        }

        [TestMethod]
        public void GetByAlbumWhenNotAvailableSongs()
        {
            // Arrange
            mockSongRepository.Setup(x => x.GetByAlbum("Test Album")).Returns(new List<Song>());

            //Act

            // Assert
            Assert.ThrowsException<NoSongsByAlbumException>(() => songService.GetByAlbum("Test Album"));
        }

        [TestMethod]
        public void GetTopLikedSongs()
        {
            // Arrange
            var song = new Song
            {
                FileName = "test.mp3",
                CreationDate = DateTime.Now,
                Album = "Test Album",
                Title = "Test Title",
                Author = "Test Author",
                Genre = "Test Genre",
                Likes = 0,
                Duration = 0,
                ImageURL = "test.jpg",
                UsersWhoLiked = new List<string>()
            };
            mockSongRepository.Setup(x => x.GetAll()).Returns(new List<Song> { song });

            // Act
            var result = songService.GetTopLikedSongs();

            // Assert
            Assert.AreEqual(1, result.Count);
        }

        [TestMethod]
        public void GetByAuthorWhenAvailableSongs()
        {
            // Arrange
            var song = new Song
            {
                FileName = "test.mp3",
                CreationDate = DateTime.Now,
                Album = "Test Album",
                Title = "Test Title",
                Author = "Test Author",
                Genre = "Test Genre",
                Likes = 0,
                Duration = 0,
                ImageURL = "test.jpg",
                UsersWhoLiked = new List<string>()
            };
            mockSongRepository.Setup(x => x.GetByAuthor("Test Author")).Returns(new List<Song> { song });

            // Act
            var result = songService.GetByAuthor("Test Author");

            // Assert
            Assert.AreEqual(1, result.Count);
        }

        [TestMethod]
        public void GetByAuthorWhenNotAvailableSongs()
        {
            // Arrange
            mockSongRepository.Setup(x => x.GetByAuthor("Test Author")).Returns(new List<Song>());

            //Act

            // Assert
            Assert.ThrowsException<NoSongsByAuthorException>(() => songService.GetByAuthor("Test Author"));
        }


        [TestMethod]
        public void UpdateSong()
        {
            // Arrange
            var songDTO = new SongDTO
            {
                FileName = "test.mp3",
                CreationDate = DateTime.Now,
                Album = "Test Album",
                Title = "Test Title",
                Author = "Test Author",
                Genre = "Test Genre",
                Likes = 0,
                Duration = 0,
                ImageURL = "test.jpg",
                UsersWhoLiked = new List<string>()
            };


            // Act
            songService.Update(songDTO);
            var result = mapper.Object.Map<Song>(songDTO);

            // Assert
            mockSongRepository.Verify(x => x.Update(result), Times.Once);
        }

        [TestMethod]
        public void LikeSongWhenSongExistsAndUserHasNotLiked()
        {
            // Arrange
            var song = new Song
            {
                FileName = "test.mp3",
                CreationDate = DateTime.Now,
                Album = "Test Album",
                Title = "Test Title",
                Author = "Test Author",
                Genre = "Test Genre",
                Likes = 0,
                Duration = 0,
                ImageURL = "test.jpg",
                UsersWhoLiked = new List<string>()
            };
            mockSongRepository.Setup(x => x.GetByTitle("Test Title")).Returns(song);
            var user = new User
            {
                Name = "Test",
                Email = "test@test.com",
                Password = "test",
                Playlist = new List<Song>()
            };


            // Act
            songService.LikeSong("Test Title", user.Email);

            // Assert
            Assert.IsTrue(song.UsersWhoLiked.Contains(user.Email));
        }

        [TestMethod]
        public void LikeSongWhenSongExistsAndUserHasLiked()
        {
            // Arrange
            var song = new Song
            {
                FileName = "test.mp3",
                CreationDate = DateTime.Now,
                Album = "Test Album",
                Title = "Test Title",
                Author = "Test Author",
                Genre = "Test Genre",
                Likes = 0,
                Duration = 0,
                ImageURL = "test.jpg",
                UsersWhoLiked = new List<string>()
            };
            mockSongRepository.Setup(x => x.GetByTitle("Test Title")).Returns(song);
            var user = new User
            {
                Name = "Test",
                Email = "test@test.com",
                Password = "test",
                Playlist = new List<Song>()
            };

            song.UsersWhoLiked.Add(user.Email);
            user.Playlist.Add(song);

            // Act
            songService.LikeSong("Test Title", user.Email);

            // Assert
            Assert.IsFalse(song.UsersWhoLiked.Contains(user.Email));
        }

    }
}