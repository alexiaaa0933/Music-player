using Newtonsoft.Json;

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
        public int Likes { get; set; }
        public int Duration { get; set; }
        [JsonProperty("imageUrl")]
        public string ImageURL { get; set; }
        public List<string> UsersWhoLiked { get; set; } = new List<string>();
    }
}
