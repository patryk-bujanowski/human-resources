﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Sex { get; set; }

        public string DetailsId { get; set; }

        public UserDetails Details { get; set; }
    }
}
