function listarTodasPerguntas() {

    var htmlbase =
        `
<div class="bloco3">
<div class="divQuestoes">
<div class="questoesTitulo">
    <h2 class = "titulo">Todas as Perguntas</h2>
</div>
<div class="listaQuestoes">

</div>


</div>

<div class="infoQuestoes">

</div>
</div>`

    var quadro = document.getElementById('quadroPrincipal');

    quadro.insertAdjacentHTML('beforeend', htmlbase);


    // Seleciona o elemento onde as perguntas serão inseridas
    var divQuestoes = document.querySelector('.listaQuestoes');

    var contagemQuestoes = questoes.length;

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
            </div>`;

        // Insere o HTML da pergunta no elemento 'divQuestoes'
        divQuestoes.insertAdjacentHTML('beforeend', html);
    }
}
