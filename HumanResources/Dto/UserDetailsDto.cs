using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Dto
{
    public class UserDetailsDto
    {
        public DateTime Birthdate { get; set; }

        public string StreetAddress { get; set; }

        public string City { get; set; }

        public string PostalCode { get; set; }

        public string PhoneNumber { get; set; }
    }
}
