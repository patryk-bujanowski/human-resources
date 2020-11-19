using HumanResources.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HumanResources.Repositories
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        private readonly ApplicationDbContext context;

        public RepositoryBase(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void Create(T entity)
        {
            context.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            context.Set<T>().Remove(entity);
        }

        public IQueryable<T> FindAll()
        {
            return context.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return context.Set<T>().Where(expression).AsNoTracking();
        }

        public void Update(T entity)
        {
            context.Set<T>().Update(entity);
        }
    }
}
