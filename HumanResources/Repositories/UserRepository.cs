using HumanResources.Data;
using HumanResources.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext context)
            : base(context)
        {
        }

        public IQueryable<User> FindById(string id)
        {
            var user = FindByCondition(u => u.Id == id);
            return user;
        }

        public IQueryable<User> FindByEmail(string email)
        {
            var user = FindByCondition(u => u.Email == email);
            return user;
        }

        public bool CheckIfExists(string id)
        {
            return FindById(id).Any();
        }
    }
}
