using HumanResources.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void Build(this ModelBuilder builder)
        {
            builder.BuildEntities();

            builder.SeedData();
        }

        private static void BuildEntities(this ModelBuilder builder)
        {
            builder.BuildPosition();

            builder.BuildEmployee();

            builder.BuildEmployeeDetails();
        }

        private static void BuildPosition(this ModelBuilder builder)
        {
            builder.Entity<JobPosition>(entity =>
            {
                entity.HasKey(p => p.Id);

                entity.Property(p => p.Name)
                    .IsRequired();
            });
        }

        private static void BuildEmployee(this ModelBuilder builder)
        {
            builder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.FirstName)
                    .IsRequired();

                entity.Property(e => e.LastName)
                    .IsRequired();

                entity.Property(e => e.Sex)
                    .IsRequired()
                    .HasMaxLength(1);

                entity.HasOne(e => e.User)
                    .WithOne(u => u.Employee)
                    .HasForeignKey<Employee>(e => e.UserId);

                entity.HasOne(e => e.Position)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(e => e.PositionId);

                entity.HasOne(e => e.Details)
                    .WithOne(ed => ed.Employee)
                    .HasForeignKey<Employee>(e => e.DetailsId);
            });
        }

        private static void BuildEmployeeDetails(this ModelBuilder builder)
        {
            builder.Entity<EmployeeDetails>(entity =>
            {
                entity.HasKey(ed => ed.Id);
            });
        }

        private static void SeedData(this ModelBuilder builder)
        {

        }
    }
}
