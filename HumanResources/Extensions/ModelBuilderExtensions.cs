﻿using HumanResources.Models;
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

            builder.BuildUserDetails();
        }

        private static void BuildUser(this ModelBuilder builder)
        {
            builder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Sex)
                    .HasMaxLength(1);

                entity.HasOne(e => e.Details)
                    .WithOne(ed => ed.User)
                    .HasForeignKey<User>(e => e.DetailsId);
            });
        }

        private static void BuildUserDetails(this ModelBuilder builder)
        {
            builder.Entity<UserDetails>(entity =>
            {
                entity.HasKey(ed => ed.Id);
            });
        }

        private static void SeedData(this ModelBuilder builder)
        {

        }
    }
}
