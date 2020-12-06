using HumanResources.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Repositories
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        IQueryable<User> FindById(string id);

        IQueryable<User> FindByEmail(string email);

        bool CheckIfExists(string id);
    }
}
