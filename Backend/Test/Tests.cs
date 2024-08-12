using Business.Exceptions;
using Business.Services;
using DataAccess.Entities;
using DataAccess.Interfaces;
using Moq;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace Test
{
    public class Tests
    {
        private Mock<ISongRepository> _songRepositoryMock;
        private SongService _songService;

        [SetUp]
        public void Setup()
        {
            _songRepositoryMock = new Mock<ISongRepository>();
            _songService = new SongService(_songRepositoryMock.Object);
        }

        [Test]
        public void GetAll_NoSongsAvailable_ThrowsNoAvailableSongsException()
        {
            _songRepositoryMock.Setup(x => x.GetAll()).Returns(new List<Song>());
            Assert.Throws<Business.Exceptions.NoAvailableSongsException>(() => _songService.GetAll());
        }
    }
}
