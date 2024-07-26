namespace Backend.Exceptions
{
    public class NoSongsByAlbumException : Exception
    {
        public NoSongsByAlbumException(string album) : base($"We're sorry but we don't have any songs from {album} album") { }
    }
}
