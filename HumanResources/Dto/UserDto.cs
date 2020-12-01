﻿using System;
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

        public string Avatar { get; set; }

        public UserDetailsDto Details { get; set; }
    }
}
