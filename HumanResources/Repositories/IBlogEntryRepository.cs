using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HumanResources.Models;

namespace HumanResources.Repositories
{
    public interface IBlogEntryRepository : IRepositoryBase<BlogEntry>
    {
        IQueryable<BlogEntry> FindAllWithDetails();

        IQueryable<BlogEntry> FindById(string id);

        bool CheckIfExists(string id);
    }
}
