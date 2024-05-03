using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using api.context;
using api.Models;
using api.Repositorios.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;


namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Plataforma : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly IPerguntaRepository _perguntaRepository;

        private readonly IRespostasRepository _respostasRepository;

        private readonly ITagRepository _tagRepository;

        public Plataforma(AppDbContext context, IPerguntaRepository perguntaRepository, IRespostasRepository respostasRepository, ITagRepository tagRepository)
        {
            _context = context;
            _perguntaRepository = perguntaRepository;
            _respostasRepository = respostasRepository;
            _tagRepository = tagRepository;
        }

        [HttpGet("ListarRespostas")]

        public IActionResult ListarRespostas()
        {
           var respostas = _respostasRepository.ListarRespostas();

            return Ok(respostas);
        }

        [HttpPost("CriarQuestao")]
        public async Task<IActionResult> CriarQuestao(Pergunta pergunta)
        {
            //gerar um guid para a pergunta Id

            pergunta.Id = Guid.NewGuid();
            pergunta.RequisicaoId = Guid.NewGuid();

            //loop para colocar o id da pergunta nas respostas e criar um id para cada item

            foreach (var resposta in pergunta.Respostas)
            {
                resposta.Id = Guid.NewGuid();
                resposta.PerguntaId = pergunta.Id;
            }

            //loop para colocar o id da pergunta nas tags e criar um id para cada item

            foreach (var tag in pergunta.TAGs)
            {
                tag.Id = Guid.NewGuid();
                //loop para colocar o id da tag nas perguntas
                tag.Perguntas.Add(pergunta);
            }

            var verificarPergunta = Pergunta.VerificarPergunta(pergunta);

            if (!string.IsNullOrEmpty(verificarPergunta))
            {
                return BadRequest(verificarPergunta);
            }

             _perguntaRepository.CriarPergunta(pergunta);


            await _context.SaveChangesAsync();

            return Ok(pergunta);
        }

        [HttpPost("CriarQuestaojSON")]
        public async Task<IActionResult> CriarQuestaojSON(Pergunta pergunta)
        {
            //gerar um guid para a pergunta Id

            pergunta.Id = Guid.NewGuid();
            pergunta.RequisicaoId = Guid.NewGuid();

            //serializar a pergunta como json e retornar

            //loop para colocar o id da pergunta nas respostas e criar um id para cada item

            foreach (var resposta in pergunta.Respostas)
            {
                resposta.Id = Guid.NewGuid();
                resposta.PerguntaId = pergunta.Id;
            }



            //vamos verificar se a tag já existe, mas para isso precisamos normalizar o nome da tag
            List<TAG> tagsParaAdicionar = new List<TAG>();
            List<TAG> tagsParaRemover = new List<TAG>();


            foreach (var tag in pergunta.TAGs)
            {
              
                //consulta de tag no banco, ITag Repository?
                var tagBanco =  _tagRepository.ProcurarTagNome(tag.Texto);

                if (tagBanco != null)
                {
                    tagsParaRemover.Add(tag);
                    tagsParaAdicionar.Add(tagBanco);
                }
                else
                {
                    tag.Id = Guid.NewGuid();
                }

                tag.Perguntas.Add(pergunta);
            }

            foreach (var tag in tagsParaRemover)
            {
                pergunta.TAGs.Remove(tag);
            }

            foreach (var tag in tagsParaAdicionar)
            {
                pergunta.TAGs.Add(tag);
            }

            var verificarPergunta = Pergunta.VerificarPergunta(pergunta);

            if (!string.IsNullOrEmpty(verificarPergunta))
            {
                return BadRequest(verificarPergunta);
            }

            var perguntaGerada = _perguntaRepository.CriarPergunta(pergunta);

            //persistir no bd
            await _context.SaveChangesAsync();

            return Ok(perguntaGerada);
        }


       


        [HttpGet("ListarQuestoes")]
        public async Task<IActionResult> ListarQuestoes()
        {

            var perguntas = _perguntaRepository.ListarPerguntas();

            return Ok(perguntas);
        }

        [HttpGet("ResponderQuestao")]
        public async Task<IActionResult> ResponderQuestao(string IdPergunta, string IdResposta)
        {
            //converter para guid os dois Ids

            Guid guidIdPergunta = Guid.Parse(IdPergunta);
            Guid guidIdResposta = Guid.Parse(IdResposta);

            //verificar se existe a pergunta com esse id

            var perguntas = _perguntaRepository.ListarPerguntas();

            var pergunta = perguntas.FirstOrDefault(p => p.Id == guidIdPergunta);

            if (pergunta == null)
            {
                return NotFound("Pergunta não encontrada");
            }

            //verificar se a resposta existe


            //RespostasRepository?
            var respostas = _respostasRepository.ListarRespostas();

            var resposta = respostas.FirstOrDefault(r => r.Id == guidIdResposta);

            if (resposta == null)
            {
                return NotFound("Resposta não encontrada");
            }

            //verificar se dentro da pergunta essa é uma das respostas correta

            if (resposta.Correta)
            {
                return Ok("Resposta correta");
            }

            else
            {
                return Ok("Resposta incorreta");
            }

        }
        [HttpGet("ListarTags")]
        public async Task<IActionResult> ListarTags()
        {
            //Listo as tags
            //var tags = _context.TAGs.ToList();

            var tags = _tagRepository.ListarTags();


            //retorno as tags com as perguntas
            foreach (var tag in tags)
            {
                var perguntasLista = _perguntaRepository.ListarPerguntas();


                tag.Perguntas = perguntasLista.Where(p => p.TAGs.Any(t => t.Id == tag.Id)).ToList();
            }

            //remover as tags que não tem perguntas
            var tagsPerguntas = new List<TAG>(tags);
            var tagsToRemove = new List<TAG>();

            foreach (var tag in tagsPerguntas)
            {
                if (tag.Perguntas.Count == 0)
                {
                    tagsToRemove.Add(tag);
                }
            }

            foreach (var tag in tagsToRemove)
            {
                tagsPerguntas.Remove(tag);
            }

            return Ok(tagsPerguntas);
        }

        [HttpGet("procurarTag")]
        public async Task<IActionResult> ProcurarTag([FromBody] string tag)
        {
            var tagNormalizada = tag.ToLower().Trim();

            //consulta de TAG por texto / nome

            var tags = _tagRepository.ListarTags();

            var tagsBanco = tags.Where(t => t.Texto.ToLower().Trim().Contains(tagNormalizada)).ToList();

            if (tagsBanco == null)
            {
                return NotFound("Tag não encontrada");
            }

            //procuro as perguntas que tem essa tag

            var perguntasLista = _perguntaRepository.ListarPerguntas();

            foreach (var tagBanco in tagsBanco)
            {
                tagBanco.Perguntas = perguntasLista.Where(p => p.TAGs.Any(t => t.Id == tagBanco.Id)).ToList();
            }

            //tagBanco.Perguntas = _context.Perguntas.Where(p => p.TAGs.Any(t => t.Id == tagBanco.Id)).ToList();


            //retorno uma lista de tags com as perguntas

            return Ok(tagsBanco);
        }

        [HttpGet("procurarQuestaoTAG")]
        public async Task<IActionResult> procurarQuestaoTAG([FromBody] string tagid)
        {
            var idRecebido = tagid.Replace("[", "").Replace("]", "").Replace("\"", "");

            var idConvertido = Guid.Parse(idRecebido);

            //consulta de tag por ID

            var tagsLista = _tagRepository.ListarTags();

            var tagBanco = tagsLista.FirstOrDefault(t => t.Id == idConvertido);

            if (tagBanco == null)
            {
                return NotFound("Tag não encontrada");
            }

            //retorno uma lista de perguntas com essa tag, aqui ela acessa a PerguntasRepository

            var perguntasLista = _perguntaRepository.ListarPerguntas();

            tagBanco.Perguntas = perguntasLista.Where(p => p.TAGs.Any(t => t.Id == tagBanco.Id)).ToList();

            //procurar as respostas dessas perguntas

            //aqui ela acessa a RespostasRepository

            var respostaLista = _respostasRepository.ListarRespostas();

            foreach (var pergunta in tagBanco.Perguntas)
            {
                pergunta.Respostas = respostaLista.Where(r => r.PerguntaId == pergunta.Id).ToList();
            }

            //retorna as perguntas com as respostas e a tag

            return Ok(tagBanco.Perguntas);
        }

        [HttpGet("procurarQuestaoEnunciado")]

        public async Task<IActionResult> procurarQuestaoEnunciado ([FromBody] string enunciado)
        {
            var enunciadoNormalizado = enunciado.ToLower();

            //consulta de pergunta por enunciado


            var perguntas = _perguntaRepository.ListarPerguntasPorEnunciado(enunciadoNormalizado);

            if (perguntas == null)
            {
                return NotFound("Pergunta não encontrada");
            }

            //consulta de respostas por pergunta

            var respostas = _respostasRepository.ListarRespostas();

            foreach(var pergunta in perguntas)
            {
                pergunta.Respostas = respostas.Where(r => r.PerguntaId == pergunta.Id).ToList();
            }




            return Ok(perguntas);
        }


        [HttpDelete("apagarQuestao")]
        public async Task<IActionResult> apagarQuestao([FromBody] string questaoId)
        {

            var idRecebido = questaoId.Replace("[", "").Replace("]", "").Replace("\"", "");

            var idConvertido = Guid.Parse(idRecebido);

            var pergunta = _perguntaRepository.DeletarPergunta(idConvertido);

            if (pergunta == null)
            {
                return BadRequest("A pergunta não existe");
            }

            //internamente eu estou excluindo as respostas junto
     
          _context.SaveChanges();


            return Ok();
        }

        [HttpPut("editarQuestao")]
        public IActionResult EditarQuestao(Pergunta pergunta)
        {
            var idRecebido = pergunta.Id;

    //         var perguntaBanco = _context.Perguntas
    // .Include(p => p.Respostas) // Inclui as respostas relacionadas
    // .Include(p => p.TAGs) // Inclui as tags relacionadas
    // .FirstOrDefault(p => p.Id == idRecebido); // Adiciona o filtro para obter a pergunta específica

            var perguntaBanco = _perguntaRepository.BuscarPerguntaPorId(idRecebido);


            // Certifique-se de que idPergunta é o identificador da pergunta que você deseja obter.
            if (perguntaBanco == null)
            {
                return BadRequest("A pergunta não existe");
            }


            perguntaBanco.Conteudo = pergunta.Conteudo;
            perguntaBanco.Explicacao = pergunta.Explicacao;

            foreach (var resposta in pergunta.Respostas)
            {

                //verificar se a resposta existe

                var respostaBanco = _respostasRepository.BuscarRespostaPorId(resposta.Id);

                if (respostaBanco == null)
                {
                    return BadRequest("A resposta não existe");
                }

                respostaBanco.Conteudo = resposta.Conteudo;
                respostaBanco.Correta = resposta.Correta;
                respostaBanco.Erro = resposta.Erro;

            }

            //preciso fazer a verificacao nas tags, se tiver uma tag nova eu preciso procurar no bd e ver se ela existe, se nao existir eu a crio e coloco o id, se existir eu apenas a adiciono

            foreach (var tag in pergunta.TAGs)
            {

                Console.WriteLine(tag.Texto);

                var tagBanco = _context.TAGs.FirstOrDefault(t => t.Texto == tag.Texto.ToLower().Trim());

                if (tagBanco == null)
                {
                    tag.Id = Guid.NewGuid();
                     _context.TAGs.Add(tag);
                    perguntaBanco.TAGs.Add(tag);
                     _context.SaveChanges();

                }

            }

            _context.SaveChanges();



            return Ok();
        }




    }
}