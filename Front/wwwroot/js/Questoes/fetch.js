function getTodasPerguntas() {
    return fetch('http://localhost:5268/api/plataforma/ListarQuestoes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((data) => {
        var perguntas = Object.values(data);
        questoes = perguntas; 

        
        preencherTelaInicial(questoes);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function criarQuestaoFetch() {
    var formData = getFormData();

    fetch('http://localhost:5268/api/plataforma/criarquestao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            //recarregar a página
            location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function editarQuestaoFetch() {
    var formData = getFormData();

    fetch('http://localhost:5084/api/plataforma/editarquestao', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            //recarregar a página
            location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function deletarQuestaoFetch(questaoId) {
    // Certifique-se de que questaoId é uma string
    const questaoIdString = JSON.stringify(questaoId);

    fetch('http://localhost:5268/api/plataforma/apagarQuestao', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        // Envia o questaoId como uma string JSON
        body: questaoIdString,
    })
    .then(response => {
        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error('Falha ao deletar a questão');
        }
        location.reload();
    })
    .then(data => {
        // Recarregar a página
         location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
