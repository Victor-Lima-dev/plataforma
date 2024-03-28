function getFormData() {
    // Seleciona o formulário
    var form = document.getElementById('formCriarQuestao');

    //remover o evento de recarregar a página
    form.addEventListener('submit', function (event) {
        event.preventDefault();
    });

    // selecionar os inputs
    var enunciado = document.getElementById('enunciado').value;
    var justificativa = document.getElementById('justificativa').value;

    // criar um objeto com os dados
    var formData = {
        enunciado: enunciado,
        justificativa: justificativa,
    };

    // Itera sobre os elementos do formulário
    for (var i = 1; i <= 4; i++) {
        formData['alternativa' + i] = document.getElementById('alternativa' + i).value;
        formData['justificativaAlternativa' + i] = document.getElementById('justificativaAlternativa' + i).value;
    }

    // Verifica se todos os campos foram preenchidos
    for (var key in formData) {
        if (formData[key] === '') {
            alert('Por favor, preencha todos os campos antes de enviar.');
            return;
        }
    }

    const guidId = "0e7745b3-fea7-40ed-8445-ad622e95904f";

    var questaoMontada = {
        RequisicaoId: guidId,
        Conteudo: enunciado,
        Valided: false,
        Respostas: [],
        Tags: [
            {
                Texto: enunciado,
                Perguntas: []
            }
        ],
        Explicacao: justificativa,
        Erro: ""
    }
    //adicionar as respostas usando o for
    for (var i = 1; i <= 4; i++) {
        questaoMontada.Respostas.push({
            Conteudo: formData['alternativa' + i],
            PerguntaId: guidId,
            Correta: false,
            Valided: false,
            Erro: formData['justificativaAlternativa' + i]
        });
    }

    //verificar qual inputRadio esta marcado, o ultimo caracter é o número da alternativa
    for (var i = 1; i <= 4; i++) {
        if (document.getElementById('inputRadio' + i).checked) {
            questaoMontada.Respostas[i - 1].Correta = true;
        }
    }

    return questaoMontada;
}
    function criarQuestaoGerarHTML() {
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
                            <textarea class="form-control" aria-label="With textarea" id="enunciado" required></textarea>
                        </div>
                    </div>
    
    
                    <div class="criarQuestaoDiv">
                        <h3 class="criarQuestao-Titulo">Justificativa</h3>
                        <div class="input-group">
    
                            <textarea class="form-control" aria-label="With textarea" id="justificativa" required></textarea>
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
                        <textarea class="form-control" aria-label="With textarea" id="alternativa1" required></textarea>
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
                            id="justificativaAlternativa1" required></textarea>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Alternativa</span>
                        <textarea class="form-control" aria-label="With textarea" id="alternativa2" required></textarea>
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
                            id="justificativaAlternativa2" required></textarea>
    
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Alternativa</span>
                        <textarea class="form-control" aria-label="With textarea" id="alternativa3" required></textarea>
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
                            id="justificativaAlternativa3" required></textarea>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Alternativa</span>
                        <textarea class="form-control" aria-label="With textarea" id="alternativa4" required></textarea>
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
                            id="justificativaAlternativa4" required></textarea>
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
    }

    function revelarJustificativas() {
        //remover o evento de recarregar a página
        event.preventDefault();
        var justificativas = document.querySelectorAll('.criarQuestao-Justificativa');
        justificativas.forEach(function (justificativa) {
            justificativa.classList.toggle('d-none');
        });
    }

