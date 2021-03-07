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
            CreateMap<UserDto, User>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));

            CreateMap<UserRegistrationDto, User>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));

            CreateMap<BlogEntry, BlogEntryDto>();
            CreateMap<BlogEntryDto, BlogEntry>();
            CreateMap<BlogEntry, BlogEntryEditDto>();
            CreateMap<BlogEntryEditDto, BlogEntry>();

            CreateMap<BlogEntryVote, BlogEntryVoteDto>();
            CreateMap<BlogEntryVoteDto, BlogEntryVote>();
        }
    }
}
