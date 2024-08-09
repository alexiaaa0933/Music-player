namespace Business.Exceptions
{
    public class NoAvailableSongsException : Exception
    {
        public NoAvailableSongsException() : base($"Unfortunately there are no available songs at the moment") { }
    }
}
