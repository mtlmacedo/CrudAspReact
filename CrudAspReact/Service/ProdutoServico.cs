using CrudAspReact.Context;
using CrudAspReact.Models;
using CrudAspReact.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudAspReact.Service
{
    public class ProdutoServico
    {
        private IProdutoRepositorio _produtoRepositorio;
        public ProdutoServico(ProdutoContext context) 
        {
            this._produtoRepositorio = new ProdutoRepositorio(context);
        }
        public void DeleteProduto(int id)
        {   
            Produto produto = this.GetProdutoById(id);
            this._produtoRepositorio.DeleteProduto(id);
        }
        public IEnumerable<Produto> GetProduto()
        {
            IEnumerable<Produto> produtos = this._produtoRepositorio.GetProduto();
            return produtos;
        }
        public Produto GetProdutoById(int id)
        {
            Produto produto = this._produtoRepositorio.GetProdutoById(id);
            if (produto == null)
            {
                throw new Exception("Produto Não encontrado");
            }
            return produto;
        }
        public void PostProduto(Produto produto)
        {
            if (produto != null)
            {
                if (!this.ProdutoExists(produto.Id)) {
                    this._produtoRepositorio.PostProduto(produto);
                }
                else
                {
                    throw new Exception("Produto Ja cadastrado");
                }
            }
            else
            {
                throw new Exception("Dados Invalidos");
            }
        }
        public void PutProduto(Produto produto)
        {
            if (produto != null)
            {
                if (this.ProdutoExists(produto.Id))
                {
                    this._produtoRepositorio.PutProduto(produto);
                }
                else
                {
                    throw new Exception("Produto Não Encontrado");
                }
            }
            else
            {
                throw new Exception("Dados Invalidos");
            }
        }
        private bool ProdutoExists(int id)
        {
            return this._produtoRepositorio.ProdutoExists(id);
        }
    }
}
