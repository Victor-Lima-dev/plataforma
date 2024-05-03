using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.context;
using api.Models;

namespace api.Repositorios.Interfaces
{
    public interface IPerguntaRepository
    {
        public Pergunta CriarPergunta(Pergunta pergunta);

        public Pergunta EditarPergunta(Pergunta pergunta);
        public IEnumerable<Pergunta> ListarPerguntas();
        public Pergunta BuscarPerguntaPorId(Guid id);
        public Resposta BuscarRespostaPorId(Guid id);

        public IEnumerable<Resposta> ListarRespostas();       
       
        public Pergunta DeletarPergunta(Guid id);

        public IEnumerable<Pergunta> ListarPerguntasPorEnunciado(string enunciado);
    }
}