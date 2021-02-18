using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CrudAspReact.Models
{
    [Table("Produto")]
    public class Produto
    {
        [Column("Id")]
        public int Id { get; set; }
        [Column("Valor")]
        public decimal Valor { get; set; }
        [Column("Data")]
        public DateTime Data { get; set; }
    }
}
