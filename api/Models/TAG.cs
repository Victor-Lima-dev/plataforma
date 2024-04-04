using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class TAG : BaseModel
    {
        public string Texto { get; set; } = string.Empty;

        public List<Pergunta> Perguntas { get; set; } = new List<Pergunta>();
    }
}