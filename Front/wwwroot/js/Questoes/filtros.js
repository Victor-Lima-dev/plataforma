async function filtrarQuestoesPorEnunciado() {
    // Preenche o array de questões
    
    var questoesRecebidas = await getTodasPerguntasRetornaPerguntas();

    //pegar o enunciado do elemendo de id procurarEnunciado

    var enunciado = document.getElementById('procurarPorEnunciado').value;

    // Filtra o array de questões pelo enunciado
    var questoesFiltradas = questoesRecebidas.filter(function (questao) {
        // Retorna verdadeiro se o enunciado da questão incluir o enunciado fornecido
        return questao.conteudo.toLowerCase().includes(enunciado.toLowerCase());
    });

   

    gerarCardsQuestoes(questoesFiltradas);


    return questoesFiltradas;
}


async function filtarTags() {
    // Preenche o array de questões
    var tags = await getTodasTags();

    //pegar o enunciado do elemendo de id procurarEnunciado

    var texto = document.getElementById('procurarPorTag').value;
    texto = texto.toLowerCase();

    // Filtra o array de questões pelo enunciado
    var tagsFiltradas = tags.filter(function (tag) {

        if (tags.texto = ! null) {
            // Retorna verdadeiro se o enunciado da questão incluir o enunciado fornecido
            return tag.texto.toLowerCase().includes(texto);
        }


    });

    gerarTags(tagsFiltradas);

    return tagsFiltradas;
}

async function filtrarQuestoesPorTag(tag)
{
    await getTodasPerguntas();

    // TODO: Buscar as perguntas que possuem a tag fornecida como parâmetro
    //       e mostrar as perguntas filtradas na página

    var tagId = tag;

    var questoesFiltradas = questoes.filter(questao => 
        questao.taGs.some(tag => tag.id === tagId)
    );

    gerarCardsQuestoes(questoesFiltradas);

}

async function filtrarQuestoesPorEnunciadoRetornaQuestoes() {
    // Preenche o array de questões

    await getTodasPerguntas();

    

    //pegar o enunciado do elemendo de id procurarEnunciado

    var enunciado = document.getElementById('procurarPorEnunciado').value;

    // Filtra o array de questões pelo enunciado
    var questoesFiltradas = questoes.filter(function (questao) {
        // Retorna verdadeiro se o enunciado da questão incluir o enunciado fornecido
        return questao.conteudo.toLowerCase().includes(enunciado.toLowerCase());
    });

    questoesRecebidas = questoesFiltradas;

    //gerarCardsQuestoes(questoesFiltradas);


    return questoesFiltradas;
}