function verificarBloco2Existe() {
    // Tenta selecionar o elemento
    var element = document.querySelector('.bloco2');

    // Verifica se o elemento existe
    if (element) {
        console.log('O elemento existe!');
    } else {
        criarQuestaoGerarHTML();
    }
}

function executeCallbackAfterClearingElement(callback) {
    // Seleciona o elemento com o id 'quadroPrincipal'
    var quadroPrincipal = document.getElementById('quadroPrincipal');

    // Verifica se o elemento tem filhos
    if (quadroPrincipal.hasChildNodes()) {
        // Se tiver, remove todos os filhos
        while (quadroPrincipal.firstChild) {
            quadroPrincipal.removeChild(quadroPrincipal.firstChild);
        }
    }

    // Executa a função callback
    callback();
}

function executeCallbackAfterClearingElementSemCallBack() {
    // Seleciona o elemento com o id 'quadroPrincipal'
    var quadroPrincipal = document.getElementById('quadroPrincipal');

    // Verifica se o elemento tem filhos
    if (quadroPrincipal.hasChildNodes()) {
        // Se tiver, remove todos os filhos
        while (quadroPrincipal.firstChild) {
            quadroPrincipal.removeChild(quadroPrincipal.firstChild);
        }
    }

 
}
