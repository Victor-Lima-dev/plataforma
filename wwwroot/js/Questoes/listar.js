function gerarCardsQuestoes(questoes) {
    // Seleciona o elemento onde as perguntas serão inseridas
    var divQuestoes = document.querySelector('.listaQuestoes');

    // Remove todos os nós filhos do elemento 'divQuestoes'
    while (divQuestoes.firstChild) {
        divQuestoes.removeChild(divQuestoes.firstChild);
    }

    // Itera sobre a lista de perguntas
    for (var i = 0; i < questoes.length; i++) {
        var questaoEnviada = questoes[i]
        // Cria o HTML para a pergunta atual
        var html = `
            <div class="boxQuestao" onclick="executeCallbackAfterClearingElement(() => generateQuestionHTML(questoes[${i}]))">
                <p class="questaoEnunciado">${questoes[i].conteudo}</p>
                <div class="boxTags">`;

        // Adiciona as tags da pergunta ao HTML
        for (var j = 0; j < questoes[i].taGs.length; j++) {
            html += `<span class="tag span-Destaque">${questoes[i].taGs[j].texto}</span>`;
        }

        html += `
                </div>
                <button class="btnEditar" onclick="event.stopPropagation(); editarQuestaoHTML(questoes[${i}])">Editar</button>
                <button class="btnApagar" onclick="event.stopPropagation(); deletarQuestao(questoes[${i}])">Apagar</button>
            </div>`;

        // Insere o HTML da pergunta no elemento 'divQuestoes'
        divQuestoes.insertAdjacentHTML('beforeend', html);
    }
}

async function listarTodasPerguntas() {

    await getTodasPerguntas();

    var htmlbase =
        `
<div class="bloco3">
<div class="divQuestoes">
<div class="questoesTitulo">
    <h2 class = "titulo">Todas as Perguntas</h2>
    <input id = "procurarPorEnunciado" oninput="filtrarQuestoesPorEnunciado()"> </input>
     

</div>
<div class="listaQuestoes">

</div>


</div>

<div class="infoQuestoes">

</div>
</div>`

    var quadro = document.getElementById('quadroPrincipal');

    quadro.insertAdjacentHTML('beforeend', htmlbase);

    gerarCardsQuestoes(questoes);
}


function preencherTelaInicial(perguntas)
{
    var elementoTotalQuestoes = document.getElementById("totalExercicios");

    var contagemTotalQuestoes = perguntas.length;

    elementoTotalQuestoes.innerHTML = contagemTotalQuestoes;

}