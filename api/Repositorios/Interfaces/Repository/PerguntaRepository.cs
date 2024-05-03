using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using api.context;
using api.Models;

namespace api.Repositorios.Interfaces.Repository
{
    public class PerguntaRepository : IPerguntaRepository
    {

        public readonly AppDbContext _context;

        public readonly IRespostasRepository _respostasRepository;

        public PerguntaRepository(AppDbContext context, IRespostasRepository respostasRepository)
        {
            _context = context;
            _respostasRepository = respostasRepository;
        }
        

          public Pergunta CriarPergunta(Pergunta pergunta)
        {
            _context.Perguntas.Add(pergunta);

            return pergunta;
        }

          public IEnumerable<Pergunta> ListarPerguntas()
        {

            var perguntas = _context.Perguntas.Select(p => new Pergunta
            {
                Id = p.Id,
                Conteudo = p.Conteudo,
                Respostas = p.Respostas,
                TAGs = p.TAGs,
                Explicacao = p.Explicacao
            }).ToList();

            return perguntas;
        }

        public IEnumerable<Pergunta> ListarPerguntasPorEnunciado(string enunciado)
        {
             var perguntas = _context.Perguntas.Where(p => p.Conteudo.ToLower().Contains(enunciado)).ToList();

             return perguntas;
        }

        public Pergunta DeletarPergunta(Guid id)
        {
            var pergunta = _context.Perguntas.FirstOrDefault(p => p.Id == id);

            var respostasLista = _respostasRepository.ListarRespostas();

            var respostas = respostasLista.Where(r => r.PerguntaId == id).ToList();

            if (pergunta != null)
            {
                _context.Perguntas.Remove(pergunta);

                foreach (var resposta in respostas)
                {
                    _context.Respostas.Remove(resposta);
                }

                return pergunta;
            }


            return pergunta;
        }

        public Pergunta BuscarPerguntaPorId(Guid id)
        {
            var pergunta = _context.Perguntas.Include(p => p.Respostas) // Inclui as respostas relacionadas
    .Include(p => p.TAGs).FirstOrDefault(p => p.Id == id); 

            return pergunta;
        }

        public Resposta BuscarRespostaPorId(Guid id)
        {
            var resposta = _context.Respostas.FirstOrDefault(r => r.Id == id);


            return resposta;


        }

      

        public Pergunta EditarPergunta(Pergunta pergunta)
        {
            throw new NotImplementedException();
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

            return respostas;
        }

        
    }
}