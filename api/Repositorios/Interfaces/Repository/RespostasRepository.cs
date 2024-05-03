using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.context;
using api.Models;
namespace api.Repositorios.Interfaces.Repository
{
    public class RespostasRepository : IRespostasRepository
    {

        public readonly AppDbContext _context;

        public RespostasRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Resposta> ListarRespostas()
        {

           var respostas = _context.Respostas.Select(r => new Resposta
            {
                Id = r.Id,
                Conteudo = r.Conteudo,
                Correta = r.Correta,
                PerguntaId = r.PerguntaId
            }).ToList();

            if (respostas == null)
            {
                Console.WriteLine("nulo");
            }

            return respostas;
        }

        public Resposta BuscarRespostaPorId(Guid id)
        {
            var resposta = _context.Respostas.FirstOrDefault(r => r.Id == id);

            return resposta;
        }
        
    }
}