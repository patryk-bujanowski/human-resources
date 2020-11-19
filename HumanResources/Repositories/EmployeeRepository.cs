using HumanResources.Data;
using HumanResources.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Repositories
{
    public class EmployeeRepository : RepositoryBase<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(ApplicationDbContext context) 
            : base(context)
        {
        }

        public IQueryable<Employee> FindById(int id)
        {
            return FindByCondition(e => e.Id == id);
        }

        public bool CheckIfExists(int id)
        {
            return FindById(id).Any();
        }
    }
}
