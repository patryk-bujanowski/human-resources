using System;

namespace HumanResources.Dto 
{
    public class UserRegistrationDto
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Sex { get; set; }

        public DateTime Birthdate { get; set; }

        public string City { get; set; }

        public string PhoneNumber { get; set; }
    }
}