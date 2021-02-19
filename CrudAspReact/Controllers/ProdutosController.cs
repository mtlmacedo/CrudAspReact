using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrudAspReact.Context;
using CrudAspReact.Models;
using CrudAspReact.Repository;
using CrudAspReact.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudAspReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : Controller
    {
        private ProdutoServico produtoServico;
        public ProdutosController(ProdutoContext context)
        {
            this.produtoServico = new ProdutoServico(context);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Produto>> GetProduto()
        {
            IEnumerable<Produto> produtos = this.produtoServico.GetProduto();
            return CreatedAtAction("GetProduto", produtos);
        }

        [HttpGet("{id}")]
        public ActionResult<Produto> GetProduto(int id)
        {
            var produto = produtoServico.GetProdutoById(id);
            return CreatedAtAction("GetProduto", produto);
        }

        [HttpPut("{id}")]
        public IActionResult PutProduto(int id, [FromForm] Produto produto)
        {
            try
            {
                this.produtoServico.PutProduto(produto);
                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }            
        }

        [HttpPost]
        public ActionResult<Produto> PostProduto([FromForm] Produto produto)
        {
            try {
                this.produtoServico.PostProduto(produto);
                return CreatedAtAction("GetProduto", new { id = produto.Id }, produto);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduto(int id)
        {
            try
            {
                this.produtoServico.DeleteProduto(id);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
