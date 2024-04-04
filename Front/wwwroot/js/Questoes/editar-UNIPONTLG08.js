
function editarQuestaoHTML(questao) {
    console.log(questao)


    var inputMarcado;

    questao.respostas.forEach((element, index) => {
        if(element.correta) {
            inputMarcado = index;
        }
    });


    executeCallbackAfterClearingElementSemCallBack();
    //selecionar o elemento de id 'quadroPrincipal'
    var mainElement = document.getElementById('quadroPrincipal');

    // Define o código HTML que você deseja inserir
    var html = `
        <div class="bloco2">
        <div class="criarQuestao">
    
            <form class="criarQuestao" id="formCriarQuestao">
    
    
                <div class="criarQuestaoDiv">
    
                    <div class="criarQuestaoDiv">
                        <h2 class="criarQuestao-Titulo titulo">Criar Questão </h2>
                        <h3 class="criarQuestao-Titulo">Enunciado</h3>
                        <div class="input-group">
                            <textarea class="form-control" aria-label="With textarea" id="enunciado" required>${questao.conteudo}</textarea>
                        </div>
                    </div>
    
    
                    <div class="criarQuestaoDiv">
                        <h3 class="criarQuestao-Titulo">Justificativa</h3>
                        <div class="input-group">
    
                            <textarea class="form-control" aria-label="With textarea" id="justificativa" required> ${questao.explicacao}</textarea>
                        </div>
    
                    </div>
                </div>
    
    
                <div class="criarQuestao-Alternativas criarQuestaoDiv">
                    <div class="criarQuestao-AlternativasTitulo">
                        <h3 class="criarQuestao-Titulo">Alternativas</h3>
                        <button onclick="revelarJustificativas()">Adicionar Justificativas</button>
                    </div>
    
                    <div class="input-group">
                        <span class="input-group-text">Alternativa</span>
                        <textarea class="form-control" aria-label="With textarea" id="alternativa1" required> ${questao.respostas[0].conteudo}</textarea>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="inputRadio1" required>
                            <label class="form-check-label" for="inputRadio1">
                                Default radio
                            </label>
                        </div>
                    </div>
                    <div class="input-group criarQuestao-Justificativa d-none">
                        <span class="input-group-text span-justificativa">Justificativa</span>
                        <textarea class="form-control" aria-label="With textarea"
                            id="justificativaAlternativa1">${questao.respostas[0].erro}</textarea>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Alternativa</span>
                        <textarea class="form-control" aria-label="With textarea" id="alternativa2" required> ${questao.respostas[1].conteudo}</textarea>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="inputRadio2" required>
                            <label class="form-check-label" for="inputRadio2">
                                Default radio
                            </label>
                        </div>
                    </div>
                    <div class="input-group criarQuestao-Justificativa d-none">
                        <span class="input-group-text span-justificativa">Justificativa</span>
                        <textarea class="form-control" aria-label="With textarea"
                            id="justificativaAlternativa2">${questao.respostas[1].erro}</textarea>
    
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Alternativa</span>
                        <textarea class="form-control" aria-label="With textarea" id="alternativa3" required>${questao.respostas[2].conteudo}</textarea>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="inputRadio3" required>
                            <label class="form-check-label" for="inputRadio3">
                                Default radio
                            </label>
                        </div>
                    </div>
                    <div class="input-group criarQuestao-Justificativa d-none">
                        <span class="input-group-text span-justificativa">Justificativa</span>
                        <textarea class="form-control" aria-label="With textarea"
                            id="justificativaAlternativa3">${questao.respostas[2].erro}</textarea>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Alternativa</span>
                        <textarea class="form-control" aria-label="With textarea" id="alternativa4" required>${questao.respostas[3].conteudo}</textarea>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="inputRadio4" required>
                            <label class="form-check-label" for="inputRadio4">
                                Default radio
                            </label>
                        </div>
                    </div>
                    <div class="input-group criarQuestao-Justificativa d-none">
                        <span class="input-group-text span-justificativa">Justificativa</span>
                        <textarea class="form-control" aria-label="With textarea"
                            id="justificativaAlternativa4">${questao.respostas[3].erro}</textarea>
                    </div>
                </div>
    
                <div class="CriarQuestao-botaoSalvar">
    
                    <button type="submit" id="botaoSalvar" class="bloco1-Botao botaoSalvar"
                        onclick="criarQuestaoFetch()">Salvar</button>
                </div>
    
            </form>
    
    
        </div>
        <div class="requisitosQuestao">
            <div class="requisitosQuestao-divTitulo">
                <h3 class="requisitosQuestao-titulo">Requisitos para criar a Questão</h3>
                <p class="requisitosQuestao-paragrafo ">A Questão vai possuir:</p>
                <ul class="requisitosQuestao-ul">
                    <li class="requisitosQuestao-li">- 4 alternativas <span class="span-Destaque">obrigatório</span>
                    </li>
                    <li class="requisitosQuestao-li">- Explicação da resposta correta <span class="span-Destaque">
                            obrigatório</span></li>
                    <li class="requisitosQuestao-li">- Justificativa das Alternativas Erradas <span
                            class="span-Destaque"> obrigatório</span></li>
                </ul>
            </div>
        </div>
    </div> 
    `;

    // Insere o código HTML como o último filho do elemento 'main'
    mainElement.insertAdjacentHTML('beforeend', html);


    var inputCorreto = document.getElementById("inputRadio" + "")
}