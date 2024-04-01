async function filtrarQuestoesPorEnunciado() {
    // Preenche o array de questões
    await getTodasPerguntas();

    //pegar o enunciado do elemendo de id procurarEnunciado

    var enunciado = document.getElementById('procurarPorEnunciado').value;

    // Filtra o array de questões pelo enunciado
    var questoesFiltradas = questoes.filter(function(questao) {
        // Retorna verdadeiro se o enunciado da questão incluir o enunciado fornecido
        return questao.conteudo.toLowerCase().includes(enunciado.toLowerCase());
    });

   

   

    gerarCardsQuestoes(questoesFiltradas);
    

    return questoesFiltradas;
}

