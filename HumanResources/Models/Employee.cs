using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Models
{
    public class Employee
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Sex { get; set; }

        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public int PositionId { get; set; }

        public JobPosition Position { get; set; }

        public int DetailsId { get; set; }

        public EmployeeDetails Details { get; set; }
    }
}
