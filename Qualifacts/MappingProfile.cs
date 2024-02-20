using AutoMapper;
using Qualifacts.Entities.Models;
using Qualifacts.Shared.DataTransferObjects;

namespace Qualifacts.Api
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CalculationForCreationDto, Calculation>();
            CreateMap<UserForRegistrationDto, User>();
        }
    }
}
