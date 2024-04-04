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
   

    fetch('http://localhost:5268/api/plataforma/deletarquestao', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(questaoId),
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

