using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Models
{
    public class User : IdentityUser
    {
        public const char ContactsSeparator = ';';

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Sex { get; set; }

        public string Avatar { get; set; }

        public DateTime Birthdate { get; set; }

        public string City { get; set; }

        public ICollection<string> Contacts { get; set; }

        public ICollection<BlogEntry> BlogEntries { get; set; }
    }
}
