﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CrudAspReact.Models
{
    [Table("Aluno")]
    public class Aluno
    {
        [Column("Id")]
        public int Id { get; set; }
        [Column("Nome")]
        public string Nome { get; set; }
        [Column("Matricula")]
        public string Matricula { get; set; }

    }
}
