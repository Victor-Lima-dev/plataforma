function generateQuestionHTML(question) {
    var quadro = document.getElementById('quadroPrincipal');
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
    </div>

    
    <div class="boxAlternativaJustificativa d-none" id="${resposta.id}Alternativa" >
        <p class="alternativaJustificativa">${resposta.erro}
            </p>
    </div>
`).join('');

    // Cria o HTML completo
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

        </div>
         </div>
`;

    // Adiciona o HTML ao DOM
    quadro.insertAdjacentHTML('beforeend', html);
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
        alternativaJustificativa.classList.remove('d-none');
    }
    else {
        input.classList.add('respostaErrada');
        alternativaJustificativa.classList.remove('d-none');
    }
}