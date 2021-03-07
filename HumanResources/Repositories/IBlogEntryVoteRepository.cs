using System.Linq;
using HumanResources.Models;

namespace HumanResources.Repositories
{
    public interface IBlogEntryVoteRepository : IRepositoryBase<BlogEntryVote>
    {
         IQueryable<BlogEntryVote> FindById(string id);

         IQueryable<BlogEntryVote> FindByBlogEntryId(string blogEntryId);
    }
}