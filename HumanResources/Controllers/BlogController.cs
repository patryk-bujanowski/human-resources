using System;
using HumanResources.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HumanResources.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly ILogger<BlogController> logger;
        private readonly IRepositoryWrapper repository;

        public BlogController(ILogger<BlogController> logger,
            IRepositoryWrapper repository)
        {
            this.logger = logger;
            this.repository = repository;
        }

    }
}
