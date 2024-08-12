using AutoMapper;

namespace Business.Mappers
{
    public class SongProfile : Profile
    {
        public SongProfile()
        {
            CreateMap<DataAccess.Entities.Song, DTOs.SongDTO>();
            CreateMap<DTOs.SongDTO, DataAccess.Entities.Song>();
        }
    }
}
