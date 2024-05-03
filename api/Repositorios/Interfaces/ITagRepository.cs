using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositorios.Interfaces
{
    public interface ITagRepository
    {
        public TAG ProcurarTagNome (string nome);

        public IEnumerable<TAG> ListarTags();
    }
}