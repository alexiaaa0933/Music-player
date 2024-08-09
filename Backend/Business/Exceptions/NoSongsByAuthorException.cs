namespace Business.Exceptions
{
    public class NoSongsByAuthorException :  Exception
    {
        public NoSongsByAuthorException(string author) : base($"We're sorry but we don't have any songs by {author}") { }
    }
}
