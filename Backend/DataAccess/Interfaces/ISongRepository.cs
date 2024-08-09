using DataAccess.Entities;

namespace DataAccess.Interfaces
{
    public interface ISongRepository
    {
        public List<Song> GetAll();
        public List<Song>? GetByAuthor(string author);
        public List<Song>? GetByAlbum(string album);
        public Song? GetByTitle(string title);
        public void Update(Song song);
        public FileStream StreamSong(string fileName);
    }
}
