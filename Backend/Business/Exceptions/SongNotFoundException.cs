namespace Business.Exceptions
{
    public class SongNotFoundException : Exception
    {
        public SongNotFoundException() : base($"This song was not found.") { }
    }
}
