function deletarQuestao(questao) {
    if (confirm('Você tem certeza que deseja excluir esta questão?')) {
        
        var questaoId = questao.id;

        console.log(questaoId)

       deletarQuestaoFetch(questaoId);
        
    } 
}
