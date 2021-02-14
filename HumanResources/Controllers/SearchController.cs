using AutoMapper;
using HumanResources.Dto;
using HumanResources.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SearchController : ControllerBase
    {
        private readonly ILogger<SearchController> logger;
        private readonly IMapper mapper;
        private readonly IRepositoryWrapper repository;

        public SearchController(ILogger<SearchController> logger,
            IMapper mapper,
            IRepositoryWrapper repository)
        {
            this.logger = logger;
            this.mapper = mapper;
            this.repository = repository;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [Produces(typeof(List<UserDto>))]
        public async Task<IActionResult> GetSearchResult([FromQuery] string query)
        {
            var users = repository.Users.FindByCondition(e =>
                    e.Email.Contains(query) ||
                    e.FirstName.Contains(query) ||
                    e.LastName.Contains(query));

            if (users.Any())
            {
                var usersDto = mapper.Map<List<UserDto>>(await users.ToListAsync());
                return Ok(usersDto);
            }

            return Ok();
        }
    }
}
