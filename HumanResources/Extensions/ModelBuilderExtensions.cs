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
            builder.BuildUser();
        }

        private static void BuildUser(this ModelBuilder builder)
        {
            builder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.FirstName)
                    .IsRequired();

                entity.Property(e => e.LastName)
                    .IsRequired();

                entity.Property(e => e.Sex)
                    .IsRequired()
                    .HasMaxLength(1);

                entity.Property(e => e.Birthdate)
                    .IsRequired();

                entity.Property(e => e.City)
                    .IsRequired();

                entity.Property(e => e.PhoneNumber)
                    .IsRequired();
            });
        }

        private static void SeedData(this ModelBuilder builder)
        {

        }
    }
}
