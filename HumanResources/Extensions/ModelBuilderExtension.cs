using HumanResources.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Extensions
{
    public static class ModelBuilderExtension
    {
        public static void SeedData(this ModelBuilder builder)
        {
            var employee1 = new Employee
            {
                Id = 1,
                FirstName = "Anna",
                LastName = "Nowak"
            };

            var employee2 = new Employee
            {
                Id = 2,
                FirstName = "Bartosz",
                LastName = "Kowalski"
            };

            builder.Entity<Employee>()
                .HasData(employee1, employee2);
        }
    }
}
