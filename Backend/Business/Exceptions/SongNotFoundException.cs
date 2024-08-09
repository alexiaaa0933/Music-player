namespace Business.Exceptions
{
    public class SongNotFoundException : Exception
    {
        public SongNotFoundException(string fileName) : base($"Song with name: '{fileName}' was not found.") { }
    }
}
