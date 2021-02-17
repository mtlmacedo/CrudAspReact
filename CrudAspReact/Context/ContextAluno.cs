using CrudAspReact.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudAspReact.Context
{
    public class ContextAluno : DbContext 
    {
        public ContextAluno(DbContextOptions<ContextAluno> contextOptions) : base(contextOptions)
        {
            Database.EnsureCreated();
        }

        public DbSet<Aluno> Aluno { get; set; }
    }
}
