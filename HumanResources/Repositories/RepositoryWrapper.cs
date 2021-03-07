using HumanResources.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Repositories
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly ApplicationDbContext context;
        private IUserRepository users;
        private IBlogEntryRepository blogEntries;

        private IBlogEntryVoteRepository votes;

        public IUserRepository Users => users ??= new UserRepository(context);

        public IBlogEntryRepository BlogEntries => blogEntries ??= new BlogEntryRepository(context);

        public IBlogEntryVoteRepository Votes => votes ??= new BlogEntryVoteRepository(context);

        public RepositoryWrapper(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
