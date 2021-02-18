using CrudAspReact.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudAspReact.Context
{
    public class ProdutoContext : DbContext
    {
        public ProdutoContext(DbContextOptions<ProdutoContext> contextOptions) : base(contextOptions)
        {
            Database.EnsureCreated();
        }

        public DbSet<Produto> Produtos{ get; set; }
    }
}
