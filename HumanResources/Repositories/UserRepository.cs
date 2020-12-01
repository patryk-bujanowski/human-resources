using HumanResources.Data;
using HumanResources.Models;
using Microsoft.EntityFrameworkCore;
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

        public IQueryable<User> FindById(string id, bool withDetails = false)
        {
            var user = FindByCondition(u => u.Id == id);
            if (withDetails)
                return user.Include(u => u.Details);
            return user;
        }

        public IQueryable<User> FindByEmail(string email, bool withDetails = false)
        {
            var user = FindByCondition(u => u.Email == email);
            if (withDetails)
                return user.Include(u => u.Details);
            return user;
        }

        public bool CheckIfExists(string id)
        {
            return FindById(id).Any();
        }
    }
}
