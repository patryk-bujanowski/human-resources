using System.Globalization;
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

            builder.BuildMessage();

            builder.BuildBlogEntry();
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

                var splitStringConverter = new ValueConverter<ICollection<string>, string>(
                    e => string.Join(User.ContactsSeparator, e), 
                        e => e.Split(new[] { User.ContactsSeparator }));
                
                entity.Property(e => e.Contacts)
                    .HasConversion(splitStringConverter);

                var valueComparer = new ValueComparer<ICollection<string>>(true);

                entity.Property(e => e.Contacts)
                    .Metadata
                    .SetValueComparer(valueComparer);
            });
        }

        private static void BuildMessage(this ModelBuilder builder)
        {
            builder.Entity<Message>(entity => 
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.SentDate)
                    .IsRequired();

                entity.Property(e => e.SenderId)
                    .IsRequired();

                entity.Property(e => e.ReceiverId)
                    .IsRequired();

                entity.Property(e => e.Content)
                    .IsRequired();
            });
        }

        private static void BuildBlogEntry(this ModelBuilder builder)
        {
            builder.Entity<BlogEntry>(entity => 
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.AuthorId)
                    .IsRequired();

                entity.Property(e => e.CreationDate)
                    .IsRequired();

                entity.Property(e => e.ModificationDate)
                    .IsRequired();

                entity.Property(e => e.Body)
                    .IsRequired();
            });
        }

        private static void SeedData(this ModelBuilder builder)
        {

        }
    }
}
