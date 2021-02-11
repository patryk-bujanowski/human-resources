using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HumanResources.Data;
using HumanResources.Models;

namespace HumanResources.Repositories
{
    public class BlogEntryRepository : RepositoryBase<BlogEntry>, IBlogEntryRepository
    {
        public BlogEntryRepository(ApplicationDbContext context) 
            : base(context)
        {
        }
    }
}
