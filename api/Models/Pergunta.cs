using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Pergunta : BaseModel
    {

        public Guid RequisicaoId { get; set; }

        public string Conteudo { get; set; }

        public bool Valided { get; set; } = false;

        public List<Resposta> Respostas { get; set; } = new List<Resposta>();

        public List<TAG> TAGs { get; set; } = new List<TAG>();

        public string Explicacao { get; set; } = "";

        public string Erro { get; set; } = "";
        
    }
}