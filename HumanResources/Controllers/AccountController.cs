using AutoMapper;
using HumanResources.Dto;
using HumanResources.Models;
using HumanResources.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
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
        private readonly IEmailSender emailSender;

        public AccountController(ILogger<AccountController> logger, 
            IMapper mapper, 
            UserManager<User> userManager, 
            SignInManager<User> signInManager, 
            ITokenService tokenService,
            IEmailSender emailSender)
        {
            this.logger = logger;
            this.mapper = mapper;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.emailSender = emailSender;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [Produces(typeof(UserDto))]
        public async Task<IActionResult> Register(UserRegistrationDto userRegistration)
        {
            var user = mapper.Map<User>(userRegistration);
            var result = await userManager.CreateAsync(user, userRegistration.Password);
            if (result.Succeeded)
            {
                logger.LogInformation($"Użytkownik \"{user.UserName}\" zarejestrował się.");
                var registeredUser = await userManager.FindByEmailAsync(userRegistration.Email);

                return Ok(mapper.Map<UserDto>(registeredUser));
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [Produces(typeof(UserDto))]
        public async Task<IActionResult> Login(UserAuthenticationDto userAuthentication)
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

        [HttpPost("forgot-password")]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest();
            }

            string token = await userManager.GeneratePasswordResetTokenAsync(user);
            string callback = Url.Action("reset-password", "account", new { token, model.Email }, Request.Scheme);
            await emailSender.SendEmailAsync(model.Email, "Human Resources - resetowanie hasła", callback);

            return Ok();
        }

        [HttpPost("reset-password")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest();
            }

            var result = await userManager.ResetPasswordAsync(user, model.Token, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }
    }
}
