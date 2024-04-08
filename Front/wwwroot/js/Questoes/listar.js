function gerarCardsQuestoes(questoes) {
    // Seleciona o elemento onde as perguntas serão inseridas
    var divQuestoes = document.querySelector('.listaQuestoes');

    console.log(questoes);

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
                <div class="boxAcoes">
                <button class="btnEditar" onclick="event.stopPropagation(); editarQuestaoHTML(questoes[${i}])">Editar</button>
                <button class="btnApagar" onclick="event.stopPropagation(); deletarQuestao(questoes[${i}])">Apagar</button>
                </div>
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

<div class="filtroEnunciado">

<h2 class = "titulo">Todas as Perguntas</h2>
<input id = "procurarPorEnunciado" oninput="filtrarQuestoesPorEnunciado()"> </input>

</div>

</div>

    <div class="listaTags" >
    <h5 class = "">Filtrar por Tags</h5>

    <input id= "procurarPorTag" oninput="filtarTags()"> </input>
    <div id="boxTags">
    </div>

    </div>

<div class="listaQuestoes">

</div>


</div>

<div class="infoQuestoes">

</div>
</div>`
var quadro = document.getElementById('quadroPrincipal');

quadro.insertAdjacentHTML('beforeend', htmlbase);

var tags = await getTodasTags();

gerarTags(tags);

 gerarCardsQuestoes(questoes);
}

async function gerarTags(tags)
{
    var tags = tags;

    var boxTag = document.getElementById('boxTags');


    // Remove todos os nós filhos do elemento 'divQuestoes'
    while (boxTag.firstChild) {
        boxTag.removeChild(boxTag.firstChild);
    }
    



    for (var i = 0; i < tags.length; i++) {

        var htmlTag = `
            <span class="tag span-Destaque tagFiltro" onclick = filtrarQuestoesPorTag("${tags[i].id}")> ${tags[i].texto}</span>     
            `
            boxTag.insertAdjacentHTML('beforeend', htmlTag);
    }

}


function preencherTelaInicial(perguntas) {
    var elementoTotalQuestoes = document.getElementById("totalExercicios");

    var contagemTotalQuestoes = perguntas.length;

    elementoTotalQuestoes.innerHTML = contagemTotalQuestoes;

}