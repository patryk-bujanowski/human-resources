using AutoMapper;
using HumanResources.Dto;
using HumanResources.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();

            CreateMap<UserDetails, UserDetailsDto>();
            CreateMap<UserDetailsDto, UserDetails>();
        }
    }
}
