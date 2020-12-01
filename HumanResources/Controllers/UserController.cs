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

namespace HumanResources.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> logger;
        private readonly IRepositoryWrapper repository;
        private readonly UserManager<User> userManager;

        public UserController(ILogger<UserController> logger, IRepositoryWrapper repository, UserManager<User> userManager)
        {
            this.logger = logger;
            this.repository = repository;
            this.userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var employees = await repository.Users.FindAll().ToListAsync();
                return Ok(employees);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id, [FromQuery] bool withDetails = false)
        {
            try
            {
                var employee = await repository.Users.FindById(id, withDetails).FirstOrDefaultAsync();

                if (employee == null)
                {
                    return NotFound();
                }

                return Ok(employee);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            try
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
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPost("avatar")]
        public async Task<IActionResult> UploadAvatar(IFormFile file)
        {
            try
            {
                byte[] avatar = null;
                string userEmail = HttpContext.User.FindFirst(ClaimTypes.Email).Value;

                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    avatar = memoryStream.ToArray();
                }

                var user = await repository.Users.FindByEmail(userEmail).FirstOrDefaultAsync();
                user.Avatar = Convert.ToBase64String(avatar);

                repository.Users.Update(user);
                await repository.SaveAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostUser(User user)
        {
            try
            {
                repository.Users.Create(user);
                await repository.SaveAsync();

                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                var employee = await repository.Users.FindById(id).FirstOrDefaultAsync();
                if (employee == null)
                {
                    return NotFound();
                }

                repository.Users.Delete(employee);
                await repository.SaveAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }
    }
}
