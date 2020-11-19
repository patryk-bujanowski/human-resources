﻿using HumanResources.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Repositories
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly ApplicationDbContext context;
        private IEmployeeRepository employee;

        public IEmployeeRepository Employee => employee ??= new EmployeeRepository(context);

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