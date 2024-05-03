using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositorios.Interfaces
{
    public interface IRespostasRepository
    {
        //assinatura para retornar todas as respostas

        public IEnumerable<Resposta> ListarRespostas();

        public Resposta BuscarRespostaPorId(Guid id);
    }
}