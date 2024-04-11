function generateQuestionHTML(question) {
    var quadro = document.getElementById('quadroPrincipal');

    console.log(question);
    // Cria as tags
    var tagsHTML = question.taGs.map(tag => `<span class="ResponderQuestaoTAG tag span-Destaque">${tag.texto}</span>`).join('');

    //transformar os ids em string
    var perguntaId = question.id.toString();

    for (var i = 0; i < question.respostas.length; i++) {
        question.respostas[i].id = question.respostas[i].id.toString();
    }

    // Cria as alternativas
    var alternativasHTML = question.respostas.map((resposta, index) =>
        `

    <div class="boxAlternativa" id="${resposta.id}" onclick="document.getElementById('${resposta.id}').click(); selecionarAlternativa('${resposta.perguntaId}', '${resposta.id}');">
        <div class="form-check inputAlternativa form-check-inline">
            <input class="form-check-input inputAlternativaResponder" type="radio" name="inlineRadioOptions" id="input${resposta.id}" value="option${index}">
            <label class="form-check-label labelInput" for="input${resposta.id}">${resposta.conteudo}</label>
        </div>
        <!-- Botão para mostrar as alternativas -->
        </div>

        
        
        
        <div class="boxAlternativaJustificativa d-none" id="${resposta.id}Alternativa" >
        <p class="alternativaJustificativa">${resposta.erro}
        </p>
        </div>
        <button class="ajuda d-none botaoJustificativa" onclick="verJustificativa('${resposta.id}')" class="btn btn-primary">Lupa</button>
`).join('');

    var html = `
<div class = "bloco4">
    <div class="divResponderQuestao">
        <div class="ResponderQuestaoTags">
            ${tagsHTML}
        </div>
        <p class="enunciado">${question.conteudo}</p>
        <div class="boxResponderQuestaoAlternativas">
            ${alternativasHTML}
        </div>
     
    </div>

    <div class="infoQuestoes">
    <button  onclick="mostrarAjuda()" class="btn btn-primary">Ativar Ajuda</button>
    <button  onclick="mostrarExplicacao()" class="btn btn-primary">Ver a Explicação da Pergunta</button>

    <div id = "explicacao" class="d-none">
        <p>${question.explicacao}</p>
    </div>

    </div>
</div>
`;

    console.log(question)

    // Adiciona o HTML ao DOM
    quadro.insertAdjacentHTML('beforeend', html);
}


function verJustificativa(respostaI) {
    var alternativaJustificativa = document.getElementById(respostaI + 'Alternativa');

    //verificar se a div está visível
    if (alternativaJustificativa.classList.contains('d-none')) {
        //remover a classe d-none
        alternativaJustificativa.classList.remove('d-none');
        return;
    }
    //adicionar a classe d-none
    alternativaJustificativa.classList.add('d-none');
}

function mostrarAjuda() {
   var ajuda = document.querySelectorAll('.ajuda');

// verificar se o elemento possui a classe, se tiver, ele remove, se não tiver ele adiciona
ajuda.forEach(function (element) {
    if (element.classList.contains('d-none')) {
        element.classList.remove('d-none');
    } else {
        element.classList.add('d-none');
    }
});

}

//função para revelar o pergunta.explicacao na div infoQuestoes

function mostrarExplicacao() {
    var explicacao = document.getElementById('explicacao');
    //remover a classe d-none
    explicacao.classList.remove('d-none');
}


function selecionarAlternativa(perguntaId, respostaId) {
    var inputs = document.querySelectorAll('.inputAlternativaResponder');

    var alternativaSelecionada = null;

    inputs.forEach(function (input) {
        if (input.checked) {


            responderQuestao(respostaId, perguntaId)
        }
    });
}

function responderQuestao(alternativaId, perguntaId) {

    var perguntaId = perguntaId.toString();
    var alternativaId = alternativaId.toString();

    var pergunta = questoes.find(pergunta => pergunta.id === perguntaId);

    var alternativa = pergunta.respostas.find(resposta => resposta.id === alternativaId);

    if (alternativa.correta) {
        animacaoResposta(true, alternativaId);
    }
    else {
        animacaoResposta(false, alternativaId);
    }
}

function animacaoResposta(bool, inputId) {
    var input = document.getElementById(inputId);
    var alternativaJustificativa = document.getElementById(inputId + 'Alternativa');

    if (bool) {
        input.classList.add('respostaCorreta');
        //remover a classe d-none
        // alternativaJustificativa.classList.remove('d-none');
    }
    else {
        input.classList.add('respostaErrada');
        // alternativaJustificativa.classList.remove('d-none');
    }
}