using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.context;

namespace api.Repositorios.Interfaces.Repository
{
    public class TagRepository : ITagRepository
    {

        private readonly AppDbContext _context;

        public TagRepository(AppDbContext context)
        {
            _context = context;
        }
        
        //construtor
        public TAG ProcurarTagNome(string nome)
        {
            var tagTextoNormalizado = nome.ToLower().Trim();
            var tag = _context.TAGs.FirstOrDefault(t => t.Texto.ToLower().Trim() == tagTextoNormalizado);

            return tag;
        }
        

        public IEnumerable<TAG> ListarTags()
        {
            return _context.TAGs.ToList();
        }
        
    }
}