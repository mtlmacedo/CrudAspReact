using CrudAspReact.Context;
using CrudAspReact.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudAspReact.Repository
{
    public class ProdutoRepositorio : IProdutoRepositorio
    {
        private ProdutoContext _context;
        public ProdutoRepositorio(ProdutoContext context) 
        {
            this._context = context;
        }
        public void DeleteProduto(int id)
        {
            this._context.Produtos.Remove(this.GetProdutoById(id));
            _context.SaveChanges();
        }
        public void Dispose()
        {
            throw new NotImplementedException();
        }
        public IEnumerable<Produto> GetProduto()
        {
            var produtos = _context.Produtos.ToList();
            if(produtos == null)
            {
                throw new Exception("Não Foram Encontrados Produtos");
            }

            return produtos;
        }
        public Produto GetProdutoById(int id)
        {
            var produto = _context.Produtos.Find(id);

            if (produto == null)
            {
                throw new Exception("O Produto Não Foi Encontrado!");
            }

            return produto;
        }
        public void PostProduto(Produto produto)
        {
            _context.Produtos.Add(produto);
            _context.SaveChanges();
        }
        public void PutProduto(Produto produto)
        {
            _context.Entry(produto).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public bool ProdutoExists(int id)
        {
            return _context.Produtos.Any(e => e.Id == id);
        }
    }
}
