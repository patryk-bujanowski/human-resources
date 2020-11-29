using HumanResources.Repositories;
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
                var employees = await repository.Users.FindByCondition(e => 
                    e.FirstName.Contains(query, StringComparison.OrdinalIgnoreCase) || 
                    e.LastName.Contains(query, StringComparison.OrdinalIgnoreCase)).ToListAsync();

                return Ok(employees);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }
    }
}
