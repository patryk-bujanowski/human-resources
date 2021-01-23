using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using HumanResources.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HumanResources.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MessageController : ControllerBase
    {
        private readonly ILogger<MessageController> logger;
        private readonly IMapper mapper;
        private readonly IMessageRepository repository;

        public MessageController(ILogger<MessageController> logger,
            IMapper mapper,
            IMessageRepository repository)
        {
            this.logger = logger;
            this.mapper = mapper;
            this.repository = repository;
        }
    }
}