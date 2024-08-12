namespace Business.Exceptions
{
    public class NoSongsByAlbumException : Exception
    {
        public NoSongsByAlbumException() : base($"We're sorry but we don't have any songs from this album") { }
    }
}
