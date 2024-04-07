using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using api.context;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Plataforma : ControllerBase
    {
        private readonly AppDbContext _context;

        public Plataforma(AppDbContext context)
        {
            _context = context;
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

            _context.Perguntas.Add(pergunta);

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
                var tagTextoNormalizado = tag.Texto.ToLower().Trim();
                var tagBanco = _context.TAGs.FirstOrDefault(t => t.Texto.ToLower().Trim() == tagTextoNormalizado);

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

            _context.Perguntas.Add(pergunta);


            await _context.SaveChangesAsync();

            return Ok(pergunta);
        }

        [HttpGet("ListarQuestoes")]
        public async Task<IActionResult> ListarQuestoes()
        {
            var perguntas = _context.Perguntas.Select(p => new
            {
                p.Id,
                p.Conteudo,
                p.Respostas,
                p.TAGs
            }).ToList();

            return Ok(perguntas);
        }

        [HttpGet("ResponderQuestao")]
        public async Task<IActionResult> ResponderQuestao(string IdPergunta, string IdResposta)
        {
            //converter para guid os dois Ids

            Guid guidIdPergunta = Guid.Parse(IdPergunta);
            Guid guidIdResposta = Guid.Parse(IdResposta);

            //verificar se existe a pergunta com esse id

            var pergunta = _context.Perguntas.FirstOrDefault(p => p.Id == guidIdPergunta);

            if (pergunta == null)
            {
                return NotFound("Pergunta não encontrada");
            }

            //verificar se a resposta existe

            var resposta = _context.Respostas.FirstOrDefault(r => r.Id == guidIdResposta);

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
            var tags = _context.TAGs.ToList();
            //incluindo as perguntas relacionadas a cada tag

            foreach (var tag in tags)
            {
                tag.Perguntas = _context.Perguntas.Where(p => p.TAGs.Any(t => t.Id == tag.Id)).ToList();
            }


            return Ok(tags);
        }

        [HttpDelete("apagarQuestao")]
        public async Task<IActionResult> apagarQuestao([FromBody] string questaoId)
        {

            var idRecebido = questaoId.Replace("[", "").Replace("]", "").Replace("\"", "");

            var idConvertido = Guid.Parse(idRecebido);

            var pergunta = _context.Perguntas.Where(x => x.Id == idConvertido).FirstOrDefault();

            if (pergunta == null)
            {
                return BadRequest("A pergunta não existe");
            }

            //procurar todas as respostas com esse id e apagar

            var respostas = _context.Respostas.Where(x => x.PerguntaId == idConvertido).ToList();

            foreach (var resposta in respostas)
            {
                _context.Respostas.Remove(resposta);
            }

          

          

            _context.Perguntas.Remove(pergunta);
            _context.SaveChanges();


            return Ok();
        }

        [HttpPut("editarQuestao")]

        public IActionResult EditarQuestao(Pergunta pergunta)
        {
            var idRecebido = pergunta.Id;

            var perguntaBanco = _context.Perguntas
    .Include(p => p.Respostas) // Inclui as respostas relacionadas
    .Include(p => p.TAGs) // Inclui as tags relacionadas
    .FirstOrDefault(p => p.Id == idRecebido); // Adiciona o filtro para obter a pergunta específica


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

                var respostaBanco = _context.Respostas.FirstOrDefault(p => p.Id == resposta.Id);

                if (respostaBanco == null)
                {
                    return BadRequest("A resposta não existe");
                }

                respostaBanco.Conteudo = resposta.Conteudo;
                respostaBanco.Correta = resposta.Correta;
                respostaBanco.Erro = resposta.Erro;

            }

            _context.SaveChanges();



            return Ok();
        }




    }
}