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

 

    filtrarQuestaoEnunciado(enunciado).then(perguntas => {
        gerarCardsQuestoes(perguntas);
    });
   

   // gerarCardsQuestoes(questoesFiltradas);


    return questoesFiltradas;
}


async function filtarTags() {
    // Preenche o array de questões
    //var tags = await getTodasTags();

    //pegar o enunciado do elemendo de id procurarEnunciado

    var texto = document.getElementById('procurarPorTag').value;
    texto = texto.toLowerCase();


    filtrarTags(texto).then(tags => {
        gerarTags(tags);
    });

   
    // // Filtra o array de questões pelo enunciado
    // var tagsFiltradas = tags.filter(function (tag) {

    //     if (tags.texto = ! null) {
    //         // Retorna verdadeiro se o enunciado da questão incluir o enunciado fornecido
    //         return tag.texto.toLowerCase().includes(texto);
    //     }
    // });

    gerarTags(tagsFiltradas);

    return tagsFiltradas;
}

async function filtrarQuestoesPorTag(tag)
{

    filtrarQuestaoTagId(tag).then(tags => {

        gerarCardsQuestoes(tags);

    });


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