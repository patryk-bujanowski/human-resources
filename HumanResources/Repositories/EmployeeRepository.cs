using HumanResources.Data;
using HumanResources.Models;
using Microsoft.EntityFrameworkCore;
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

        public override IQueryable<Employee> FindAll()
        {
            return base.FindAll()
                .Include(e => e.Position);
        }

        public IQueryable<Employee> FindById(int id, bool withDetails = false)
        {
            var employee = FindByCondition(e => e.Id == id)
                .Include(e => e.Position);
            if (withDetails)
                return employee.Include(e => e.Details);
            return employee;

        }

        public bool CheckIfExists(int id)
        {
            return FindById(id).Any();
        }
    }
}
