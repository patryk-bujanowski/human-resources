using HumanResources.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Services
{
    public interface ITokenService
    {
        string GenerateAccessToken(User user);
    }
}
