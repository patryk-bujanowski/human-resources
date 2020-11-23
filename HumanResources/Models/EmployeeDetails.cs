using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Models
{
    public class EmployeeDetails
    {
        public int Id { get; set; }

        public Employee Employee { get; set; }

        public DateTime Birthdate { get; set; }

        public string StreetAddress { get; set; }

        public string City { get; set; }

        public string PostalCode { get; set; }
    }
}
