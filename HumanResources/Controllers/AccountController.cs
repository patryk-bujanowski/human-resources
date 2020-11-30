using AutoMapper;
using HumanResources.Dto;
using HumanResources.Models;
using HumanResources.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> logger;
        private readonly IMapper mapper;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly ITokenService tokenService;

        public AccountController(ILogger<AccountController> logger, 
            IMapper mapper, 
            UserManager<User> userManager, 
            SignInManager<User> signInManager, 
            ITokenService tokenService)
        {
            this.logger = logger;
            this.mapper = mapper;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegistrationDto userRegistration)
        {
            try
            {
                var user = new User 
                { 
                    UserName = userRegistration.Email, 
                    Email = userRegistration.Email,
                    FirstName = userRegistration.FirstName,
                    LastName = userRegistration.LastName,
                    Sex = userRegistration.Sex 
                };
                var result = await userManager.CreateAsync(user, userRegistration.Password);
                if (result.Succeeded)
                {
                    logger.LogInformation($"Użytkownik \"{user.UserName}\" zarejestrował się.");
                    var registeredUser = await userManager.FindByEmailAsync(userRegistration.Email);

                    return Ok(mapper.Map<UserDto>(registeredUser));
                }

                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserAuthenticationDto userAuthentication)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(userAuthentication.Email);
                if (user != null)
                {
                    var result = userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, userAuthentication.Password);
                    if (result == PasswordVerificationResult.Success)
                    {
                        string token = tokenService.GenerateAccessToken(user);
                        var loggedInUser = mapper.Map<UserDto>(user);
                        loggedInUser.AccessToken = token;

                        return Ok(loggedInUser);
                    }
                    return BadRequest();
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }
    }
}
