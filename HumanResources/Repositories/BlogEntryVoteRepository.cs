using System.Linq;
using HumanResources.Data;
using HumanResources.Models;

namespace HumanResources.Repositories
{
    public class BlogEntryVoteRepository : RepositoryBase<BlogEntryVote>, IBlogEntryVoteRepository
    {
        public BlogEntryVoteRepository(ApplicationDbContext context) 
            : base(context)
        {
            
        }

        public IQueryable<BlogEntryVote> FindById(string id)
        {
            return FindByCondition(v => v.Id == id);
        }

        public IQueryable<BlogEntryVote> FindByBlogEntryId(string blogEntryId)
        {
            return FindByCondition(v => v.BlogEntryId == blogEntryId);
        }
    }
}