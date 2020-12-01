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
        private IRepositoryWrapper repository;

        public SearchController(ILogger<SearchController> logger, IRepositoryWrapper repository)
        {
            this.logger = logger;
            this.repository = repository;
        }

        public async Task<IActionResult> GetSearchResult([FromQuery] string query)
        {
            try
            {
                var users = repository.Users.FindByCondition(e =>
                    e.Email.Contains(query) ||
                    e.FirstName.Contains(query) ||
                    e.LastName.Contains(query));

                if (users.Any())
                    return Ok(await users.ToListAsync());

                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }
    }
}
