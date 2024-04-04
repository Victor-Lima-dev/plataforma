using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.context;
using Microsoft.AspNetCore.Mvc;

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

           [HttpGet("ListarQuestoes")]
        public async Task<IActionResult> ListarQuestoes()
        {
           // var perguntas = _context.Perguntas.ToList();

            //var perguntas = _context.Perguntas.Include(p => p.Respostas).Include(p => p.TAGs).ToList();

            var perguntas = _context.Perguntas.Select(p => new
            {
                p.Id,
                p.Conteudo,
                p.Respostas,
                p.TAGs
            }).ToList();


            return Ok(perguntas);
        }  
        
    }
}