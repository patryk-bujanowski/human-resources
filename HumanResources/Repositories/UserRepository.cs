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
            var employee = FindByCondition(e => e.Id == id);
            if (withDetails)
                return employee.Include(e => e.Details);
            return employee;
        }

        public bool CheckIfExists(string id)
        {
            return FindById(id).Any();
        }
    }
}
