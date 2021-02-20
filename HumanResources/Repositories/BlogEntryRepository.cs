using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HumanResources.Data;
using HumanResources.Models;
using Microsoft.EntityFrameworkCore;

namespace HumanResources.Repositories
{
    public class BlogEntryRepository : RepositoryBase<BlogEntry>, IBlogEntryRepository
    {
        public BlogEntryRepository(ApplicationDbContext context) 
            : base(context)
        {
        }

        public IQueryable<BlogEntry> FindAllWithDetails()
        {
            return FindAll()
                .OrderByDescending(b => b.ModificationDate)
                .Include(b => b.Author);
        }
    }
}
