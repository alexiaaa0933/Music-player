using DataAccess.Entities;

namespace Business.Interfaces
{
    public interface ISongService
    {
        public List<Song> GetAll();
        public List<Song>? GetByAuthor(string author);
        public List<Song>? GetByAlbum(string album);
        public Song? GetByTitle(string title);
        public void Update(Song song);
        public FileStream GetFileStream(string fileName);
        public List<Song>? GetTopLikedSongs();
        public void LikeSong(string songName, string userEmail);
    }
}
