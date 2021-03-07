using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Dto
{
    public class UserDto
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string AccessToken { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Sex { get; set; }

        public DateTime Birthdate { get; set; }

        public string City { get; set; }

        public string PhoneNumber { get; set; }

        public ICollection<UserDto> Contacts { get; set; }
    }
}
