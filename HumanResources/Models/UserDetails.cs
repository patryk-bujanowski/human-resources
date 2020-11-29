using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Models
{
    public class UserDetails
    {
        public string Id { get; set; }

        public User User { get; set; }

        public DateTime Birthdate { get; set; }

        public string StreetAddress { get; set; }

        public string City { get; set; }

        public string PostalCode { get; set; }
    }
}
