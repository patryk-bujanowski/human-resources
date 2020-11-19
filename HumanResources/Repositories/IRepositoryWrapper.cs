using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Repositories
{
    public interface IRepositoryWrapper
    {
        IEmployeeRepository Employee { get; }

        void Save();

        Task SaveAsync();
    }
}
