﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Repositories
{
    public interface IRepositoryWrapper
    {
        IUserRepository Users { get; }

        void Save();

        Task SaveAsync();
    }
}
