﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Models
{
    public class ApplicationUser : IdentityUser
    {
        public Employee Employee { get; set; }
    }
}
