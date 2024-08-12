using Business.DTOs;

namespace Business.Interfaces
{
    public interface ISongService
    {
        public List<SongDTO> GetAll();
        public List<SongDTO>? GetByAuthor(string author);
        public List<SongDTO>? GetByAlbum(string album);
        public void Update(SongDTO song);
        public FileStream GetFileStream(string fileName);
        public List<SongDTO>? GetTopLikedSongs();
        public void LikeSong(string songName, string userEmail);
    }
}
