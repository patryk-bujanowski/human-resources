using HumanResources.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Repositories
{
    public interface IEmployeeRepository : IRepositoryBase<Employee>
    {
        IQueryable<Employee> FindById(int id);

        bool CheckIfExists(int id);
    }
}
