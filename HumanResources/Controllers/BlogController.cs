using System.Runtime.CompilerServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AutoMapper;
using HumanResources.Repositories;
using Microsoft.AspNetCore.Identity;
using HumanResources.Models;
using Microsoft.AspNetCore.Authorization;
using HumanResources.Dto;
using Microsoft.EntityFrameworkCore;

namespace HumanResources.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BlogController : ControllerBase
    {
        private readonly ILogger<BlogController> logger;
        private readonly IMapper mapper;
        private readonly IRepositoryWrapper repository;
        private readonly UserManager<User> userManager;

        public BlogController(ILogger<BlogController> logger,
            IMapper mapper,
            IRepositoryWrapper repository,
            UserManager<User> userManager)
        {
            this.logger = logger;
            this.mapper = mapper;
            this.repository = repository;
            this.userManager = userManager;
        }

        [HttpGet("entry")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        [Produces(typeof(List<BlogEntry>))]
        public async Task<IActionResult> GetBlogEntries()
        {
            var blogEntries = await repository.BlogEntries.FindAllWithDetails().ToListAsync();
            var result = mapper.Map<List<BlogEntryDto>>(blogEntries);
            return Ok(result);
        }

        [HttpPost("entry")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [Produces(typeof(BlogEntryDto))]
        public async Task<IActionResult> CreateBlogEntry(BlogEntryCreateDto blogEntryCreate)
        {
            var user = await userManager.FindByIdAsync(blogEntryCreate.AuthorId);
            if (user == null)
            {
                logger.LogError($"Nie znaleziono użytkownika o ID = \"{blogEntryCreate.AuthorId}\".");
                return BadRequest();
            }
            var blogEntry = new BlogEntry 
            { 
                Author = user, 
                Content = blogEntryCreate.Content 
            };

            repository.BlogEntries.Create(blogEntry);
            await repository.SaveAsync();

            var created = repository.BlogEntries.FindByCondition(b => b.Id == blogEntry.Id);

            return Ok(created);
        }

        [HttpPut("entry/{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> UpdateBlogEntry(string id, BlogEntryEditDto blogEntryDto)
        {
            if (id != blogEntryDto.Id)
            {
                return BadRequest();
            }

            var blogEntry = mapper.Map<BlogEntry>(blogEntryDto);
            blogEntry.ModificationDate = DateTime.Now;
            repository.BlogEntries.Update(blogEntry);

            try
            {
                await repository.SaveAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!repository.BlogEntries.CheckIfExists(id))
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

        [HttpDelete("entry/{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]

        public async Task<IActionResult> DeleteBlogEntry(string id)
        {
            var blogEntry = await repository.BlogEntries.FindById(id).FirstOrDefaultAsync();
            if (blogEntry == null)
            {
                return NotFound();
            }

            repository.BlogEntries.Delete(blogEntry);

            await repository.SaveAsync();

            return NoContent();
        }
        
        [HttpPut("entry/vote/{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        [Produces(typeof(BlogEntryDto))]
        public async Task<IActionResult> UpdateVote(string id, BlogEntryVoteDto voteDto)
        {
            if (id != voteDto.BlogEntryId)
            {
                return BadRequest();
            }
            
            var blogEntry = await repository.BlogEntries.FindById(voteDto.BlogEntryId).FirstOrDefaultAsync();
            if (blogEntry == null)
            {
                return BadRequest();
            }

            var user = await userManager.FindByIdAsync(voteDto.UserId);
            if (user == null)
            {
                return BadRequest();
            }

            switch (voteDto.Type)
            {
                case VoteType.Up:
                    blogEntry.Upvotes ??= new List<string>();
                    switch (voteDto.Mode)
                    {
                        case VoteMode.Add:
                            blogEntry.Upvotes.Add(voteDto.UserId);
                            break;
                        case VoteMode.Remove:
                            var modified = blogEntry.Upvotes.ToList();
                            modified.Remove(voteDto.UserId);
                            blogEntry.Upvotes = modified;
                            break;
                        default:
                            return BadRequest();
                    }
                    break;
                case VoteType.Down:
                    blogEntry.Downvotes ??= new List<string>();
                    switch (voteDto.Mode)
                    {
                        case VoteMode.Add:
                            var modified = blogEntry.Downvotes.ToList();
                            modified.Remove(voteDto.UserId);
                            blogEntry.Downvotes = modified;
                            break;
                        case VoteMode.Remove:
                            blogEntry.Downvotes.ToList().Remove(voteDto.UserId);
                            break;
                        default:
                            return BadRequest();
                    }
                    break;
                default:
                    return BadRequest();
            }

            repository.BlogEntries.Update(blogEntry);

            try
            {
                await repository.SaveAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!repository.BlogEntries.CheckIfExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(mapper.Map<BlogEntryDto>(blogEntry));
        }
    }
}
