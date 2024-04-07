function areaJSON() {
  var mainElement = document.getElementById('quadroPrincipal');

  var html = `<div class="blocoJSON">
  <div class="boxtextAreaJson">
      <h3>JSON</h3>

      <button onclick="criarTagHTML()">Adicionar Tag </button>

      <div class="boxCriarTags" id ="boxCriarTags">

          <div class="boxTag">
              <label for="tagId1">Tag</label>
              <input type="text" id="tagId1" name="tagId1" class="form-control">
          </div>
         

      </div>


      <textarea id="areaJSON" name="areaJSON" style="height: 300px" class="form-control"> </textarea>
      <div class="botaoJson">
          <button class="botaoSalvar" onclick="salvarJSON()">Salvar</button>

      </div>
  </div>

  <div class="info-json">
      <div>
      <button onclick="copiarPrompt()">Copiar Prompt</button>
      <h3>Modelo do JSON</h3>
      </div>
      <pre>
      <code id="json">
    {
"Id": "" 
"RequisicaoId": ""
"Conteudo": "Qual foi o principal fator que levou 
à transferência da sede do Estado do Brasil
para o Rio de Janeiro em 1763?",
"Status": "OK",
"Explicacao": ""
"Respostas": [
{
  "Id": ""
"PerguntaId": ""
"Conteudo": "A necessidade de uma 
melhor defesa
contra os ataques dos 
franceses e dos holandeses.",
"Correta": false,
"Status": "OK",
"Erro": ""
},
{
  "Id": ""
"PerguntaId": ""
"Conteudo": "A proximidade com as 
minas de ouro 
e diamantes descobertas
no interior da colônia.",
"Correta": true,
"Status": "OK"
"Erro": ""
},
{
  "Id": ""
"PerguntaId": ""
"Conteudo": "A influência dos jesuítas 
na administração
colonial e na 
catequização dos índios.",
"Correta": false,
"Status": "OK"
"Erro": ""
},
{
  "Id": ""
"PerguntaId": ""
"Conteudo": "A expansão da cultura
da cana-de-açúcar
e do 
comércio triangular com a África 
e a Europa.",
"Correta": false,
"Status": "OK"
"Erro": ""
}
]
}


      </code>
      </pre>
  </div>

  `


  mainElement.insertAdjacentHTML('beforeend', html);


}





function copiarPrompt() {

  var prompt = `""you want me to help you study for the college exam, providing a question based on a text that you send me. You want the question to be multiple choice, with four alternatives,You also want me to put my answer in JSON format, following the model that you indicate. Model The answer should follow the following JSON model
    #TEXT IN BRAZILIAN PORTUGUESE#
    {
    {
      ""RequisicaoId"": """",
      ""Conteudo"": """",
      ""Status"": """",
      ""Respostas"": [
        {
          ""PerguntaId"": """",
          ""Conteudo"": """",
          ""Correta"": """",
          ""Status"": """"
        },
        {
          ""PerguntaId"": """",
          ""Conteudo"": """",
          ""Correta"": """",
          ""Status"": """"
        },
        {
          ""PerguntaId"": """",
          ""Conteudo"": """",
          ""Correta"": """",
          ""Status"": """"
        },
        {
          ""PerguntaId"": """",
          ""Conteudo"": """",
          ""Correta"": """",
          ""Status"": """"
        },
        {
          ""PerguntaId"": """",
          ""Conteudo"": """",
          ""Correta"": """",
          ""Status"": """"
        }
      ]
    }
    ##EXAMPLE##
    User:
    Texto base: história do brasil, coroa portuguesa no brasil
    
    Assistant: 
    { “RequisicaoId”: “ “c75d06a8-a705-48ec-b6b3-9076becf20f4” ”, 
      “Conteudo”: “Qual foi o principal fator que levou à transferência da sede do Estado do Brasil para o Rio de Janeiro em 1763?”,
       “Status”: “OK”,
       "Explicacao": "faz uma explicação da resposta correta" 
       “Respostas”: [ { 
        “PerguntaId”: “ “c75d06a8-a705-48ec-b6b3-9076becf20f4” ”, 
        “Conteudo”: “A necessidade de uma melhor defesa contra os ataques dos franceses e dos holandeses.”, 
        “Correta”: False,
         “Status”: “OK”,
         "Erro": "explique porque ta errada" }, 
        { “PerguntaId”:  “c75d06a8-a705-48ec-b6b3-9076becf20f4” , 
          “Conteudo”: “A proximidade com as minas de ouro e diamantes descobertas no interior da colônia.”, 
          “Correta”: True, 
          “Status”: “OK”,
          "Erro": "explique porque esta correta" },
           { “PerguntaId”: “ “c75d06a8-a705-48ec-b6b3-9076becf20f4” ”,
             “Conteudo”: “A influência dos jesuítas na administração colonial e na catequização dos índios.”, 
             “Correta”: False,
              “Status”: “OK”,
              "Erro": "explique porque ta errada" }, {
               “PerguntaId”: “ “c75d06a8-a705-48ec-b6b3-9076becf20f4” ”, 
               “Conteudo”: “A expansão da cultura da cana-de-açúcar e do comércio triangular com a África e a Europa.”, 
               “Correta”: False, 
               “Status”: “OK”,
               "Erro": "explique porque ta errada" } ] }
    
    
    Orientações
    The question must be related to the base text that you send me. The explanation should be brief and clear, using facts from the base text. The alternatives must be plausible, but only one must be correct. I must put everything in JSON format to facilitate copying and inserting into your system
    
    The question must be related to the base text that you send me. The explanation should be brief and clear, using facts from the base text. The alternatives must be plausible, but only one must be correct. I must put everything in JSON format to facilitate copying and inserting into your system.
    you want me to help you study for the college exam, providing a question based on a text that you send me. You want the question to be multiple choice, with four alternatives, . You also want me to put my answer in JSON format, following the model that you indicate. Model The answer should follow the following JSON model:
    ###
    ##TEXT IN BRAZILIAN PORTUGUESE##
    ###
    ####YOU REMEMBER THE MODEL? SINCE YOU UNDERSTOOD, MAKE THE QUESTION BASED ON THE TEXT BASE, I TRUST THAT YOU UNDERSTOOD, YOU CAN MAKE THE QUESTION FOLLOWING THE MODEL, NOT TEXT BASE IN ANWSER , in the ID need put GUID format #### 
    """"`

  //passar o prompt para o clipboard
  navigator.clipboard.writeText(prompt).then(() => {

  })
}


function salvarJSON() {
  //desabilitar o efeito de sumibt



  var json = document.getElementById("areaJSON").value;

  const guidId = "0e7745b3-fea7-40ed-8445-ad622e95904f";

  // var tag1Texto = document.getElementById("tagId1").value;
  // var tag2Texto = document.getElementById("tagId2").value;


  var questaoDeserializada = JSON.parse(json);

  questaoDeserializada.Id = guidId;

  questaoDeserializada.RequisicaoId = guidId;

  questaoDeserializada.Respostas.forEach(resposta => {
    resposta.Id = guidId;
    resposta.PerguntaId = guidId;
  });

  questaoDeserializada.Tags = [];
  var i = 1;
  while (true) {
    var tagInput = document.getElementById("tagId" + i);
    if (tagInput) {
      questaoDeserializada.Tags.push({
        Texto: tagInput.value,
        Id: guidId
      });
      i++;
    } else {
      break;
    }
  }

  // questaoDeserializada.Tags = [
  //   {
  //     Texto: tag1Texto,
  //     Id: guidId
  //   },
  //   {
  //     Texto: tag2Texto,
  //     Id: guidId
  //   }
  //   // Adicione mais tags conforme necessário
  // ];

  questaoDeserializada.Erro = "";

  console.log(questaoDeserializada);

  //criarQuestaoJsonFetch(questaoDeserializada);
}

var idCounter = 2;

function criarTagHTML() {
  var boxTag = document.getElementById("boxCriarTags");

  var html = `<div class="boxTag">
  <label for="tagId${idCounter}">Tag</label>
  <input type="text" id="tagId${idCounter}" name="tagId${idCounter}" class="form-control">
</div>`;

idCounter++;

boxTag.insertAdjacentHTML('beforeend', html);


}
