using AutoMapper;

namespace Business.Mappers
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<DataAccess.Entities.User, Business.DTOs.UserDTO>();
            CreateMap<Business.DTOs.UserDTO, DataAccess.Entities.User>();
        }
    }
}
