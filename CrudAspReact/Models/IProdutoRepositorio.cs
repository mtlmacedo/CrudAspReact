using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudAspReact.Models
{
    interface IProdutoRepositorio : IDisposable
    {
        IEnumerable<Produto> GetProduto();
        Produto GetProdutoById(int id);
        void PutProduto(Produto produto);
        void PostProduto(Produto produto);
        void DeleteProduto(int id);
        bool ProdutoExists(int id);
    }   
}
