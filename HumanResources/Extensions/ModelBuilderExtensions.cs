﻿using System.Globalization;
using System.Collections.Immutable;
using HumanResources.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore.ChangeTracking;

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

            builder.BuildBlogEntry();

            builder.BuildBlogEntryVote();
        }

        private static void BuildUser(this ModelBuilder builder)
        {
            builder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Sex)
                    .HasMaxLength(1);

                var splitStringConverter = new ValueConverter<ICollection<string>, string>(
                    e => string.Join(User.ContactsSeparator, e), 
                        e => e.Split(new[] { User.ContactsSeparator }));
                
                var valueComparer = new ValueComparer<ICollection<string>>(true);
                
                entity.Property(e => e.Contacts)
                    .HasConversion(splitStringConverter);
                
                entity.Property(e => e.Contacts)
                    .Metadata
                    .SetValueComparer(valueComparer);
            });
        }

        private static void BuildBlogEntry(this ModelBuilder builder)
        {
            builder.Entity<BlogEntry>(entity => 
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Content)
                    .IsRequired();

                entity.Property(e => e.CreationDate)
                    .IsRequired();

                entity.Property(e => e.ModificationDate)
                    .IsRequired();
            });
        }

        private static void BuildBlogEntryVote(this ModelBuilder builder)
        {
            builder.Entity<BlogEntryVote>(entity => 
            {
                entity.HasKey(e => e.Id);
            });
        }
        
        private static void SeedData(this ModelBuilder builder)
        {

        }
    }
}
