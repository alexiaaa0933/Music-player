namespace Backend.Models
{
    public class Song
    {
        public string FileName { get; set; }
        public DateTime CreationDate { get; set; }
        public string Album { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public TimeSpan Duration { get; set; }
        public string ImageUrl { get; set; }    
    }
}
