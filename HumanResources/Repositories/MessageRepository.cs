using HumanResources.Data;
using HumanResources.Models;

namespace HumanResources.Repositories
{
    public class MessageRepository : RepositoryBase<Message>, IMessageRepository
    {
        public MessageRepository(ApplicationDbContext context) 
            : base(context)
        {
        }
    }
}