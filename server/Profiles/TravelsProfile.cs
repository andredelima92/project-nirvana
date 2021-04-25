using AutoMapper;
using server.Dtos;
using server.Models;

namespace server.Profiles
{
    public class TravelsProfile: Profile
    {
        public TravelsProfile()
        {
            CreateMap<Travel, TravelReadDto>();
            CreateMap<TravelCreateDto, Travel>();
        }
    }
}