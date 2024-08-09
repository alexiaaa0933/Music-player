using DataAccess.Entities;
using DataAccess.Interfaces;

namespace DataAccess.Repositories
{
    public class SongRepository : ISongRepository
    {
        private readonly string _musicDirectory = "../DataAccess/Music";
        private static List<Song> _songs = new List<Song>();

        public SongRepository()
        {
            var files = Directory.GetFiles(_musicDirectory, "*.mp3");

            foreach (var file in files)
            {
                var tagFile = TagLib.File.Create(file);
                var existingSong = _songs.FirstOrDefault(s => s.FileName == Path.GetFileName(file));

                if (existingSong == null)
                {
                    var usersWhoLiked = tagFile.Tag.Comment != null
                        ? tagFile.Tag.Comment.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries).ToList()
                        : new List<string>();

                    _songs.Add(new Song
                    {
                        FileName = Path.GetFileName(file),
                        CreationDate = System.IO.File.GetCreationTime(file),
                        Album = tagFile.Tag.Album.Split('|')[0],
                        Title = tagFile.Tag.Title,
                        Author = tagFile.Tag.FirstPerformer ?? string.Join(", ", tagFile.Tag.Performers),
                        Genre = tagFile.Tag.FirstGenre,
                        Duration = (int)tagFile.Properties.Duration.TotalSeconds,
                        Likes = (int)tagFile.Tag.TrackCount,
                        UsersWhoLiked = usersWhoLiked,
                        ImageURL = tagFile.Tag.Album.Split('|')[1]
                    });
                }
            }
        }
        public List<Song> GetAll()
        {
            return _songs;
        }

        public List<Song>? GetByAlbum(string album)
        {
            var songsByAlbum = _songs.Where(s => s.Album == album).ToList();
            if(songsByAlbum == null)
            {
                return null;
            }
            return songsByAlbum;
        }

        public List<Song>? GetByAuthor(string author)
        {
            var songsByAuthor = _songs.Where(s => s.Author == author).ToList();
            if(songsByAuthor == null)
            {
                return null;
            }
            return songsByAuthor;
        }

        public Song? GetByTitle(string title)
        {
            Song? song = _songs.FirstOrDefault(s => s.Title == title);
            return song;
        }

        public void Update(Song song)
        {
            var filePath = Path.Combine(_musicDirectory, song.FileName);
            if (System.IO.File.Exists(filePath))
            {
                var file = TagLib.File.Create(filePath);
                file.Tag.TrackCount = (uint)song.Likes;
                file.Tag.Comment = string.Join(",", song.UsersWhoLiked);
                file.Save();
            }
        }

        public FileStream StreamSong(string fileName)
        {
            var filePath = Path.Combine(_musicDirectory, fileName);
            if (!System.IO.File.Exists(filePath))
            {
                return null;
            }

            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

            return stream;
        }
    }
}
