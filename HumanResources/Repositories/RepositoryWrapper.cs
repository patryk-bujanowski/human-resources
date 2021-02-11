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
        private IMessageRepository messages;
        private IBlogEntryRepository blogEntries;

        public IUserRepository Users => users ??= new UserRepository(context);

        public IMessageRepository Messages => messages ??= new MessageRepository(context);

        public IBlogEntryRepository BlogEntries => blogEntries ??= new BlogEntryRepository(context);

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
