using AutoMapper;
using Business.Interfaces;
using Business.Mappers;
using Business.Services;
using DataAccess.Interfaces;
using DataAccess.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Business
{
    public static class ServicesExtension
    {
        public static void AddBusinessServices(this IServiceCollection services)
        {
            services.AddScoped<ISongService, SongService>();
            services.AddScoped<ISongRepository, SongRepository>();
            services.AddAutoMapper(typeof(SongProfile));

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddAutoMapper(typeof(UserProfile));
        }
    }
}
