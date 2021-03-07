using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HumanResources.Data;
using HumanResources.Models;
using HumanResources.Repositories;
using Microsoft.Extensions.Logging;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using HumanResources.Dto;

namespace HumanResources.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> logger;
        private readonly IMapper mapper;
        private readonly IRepositoryWrapper repository;
        private readonly UserManager<User> userManager;

        public UserController(ILogger<UserController> logger, 
            IMapper mapper,
            IRepositoryWrapper repository, 
            UserManager<User> userManager)
        {
            this.logger = logger;
            this.mapper = mapper;
            this.repository = repository;
            this.userManager = userManager;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [Produces(typeof(List<UserDto>))]
        public async Task<IActionResult> GetUsers()
        {
            var users = await repository.Users.FindAll().ToListAsync();
            var result = mapper.Map<List<UserDto>>(users);
            return Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [Produces(typeof(UserDto))]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await repository.Users.FindById(id).FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            var result = mapper.Map<UserDto>(user);
            return Ok(result);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            repository.Users.Update(user);

            try
            {
                await repository.SaveAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!repository.Users.CheckIfExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
    }
}
