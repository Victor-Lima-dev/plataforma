async function filtrarQuestoesPorEnunciado() {
    // Preenche o array de questões
    await getTodasPerguntas();

    //pegar o enunciado do elemendo de id procurarEnunciado

    var enunciado = document.getElementById('procurarPorEnunciado').value;

    // Filtra o array de questões pelo enunciado
    var questoesFiltradas = questoes.filter(function (questao) {
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

    console.log(questoes)

    var tagId = tag;

    // Supondo que 'questoes' é um array de objetos questão e cada 'questao' tem uma propriedade 'tags' que é um array de tags
var questoesFiltradas = questoes.filter(function (questao) {
    // Verifica se alguma das tags da questão tem o id igual a 'tagId'
    return questao.taGs.some(function (tag) {
        return tag.id === tagId;
    });
});


   
gerarCardsQuestoes(questoesFiltradas);

}

