$(function () { 
  $("#navbarToggle").blur(function (event) { //função para fechar o navbar toggle quando clica em outro lugar da tela
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
  $("#navbarToggle").click(function (event) { 
    $(event.target).focus();
  });
});



(function (global) {

var cm = {}; //namespace

var menuSelector = "snippets/selection_snippet.html";
var nota_json = "https://api.polijunior.com.br/notas";
var notasHtml = "snippets/notas_snippet.html";
var finalResult = "snippets/result-snippet.html";


// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='img/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}'
// with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}

document.addEventListener("DOMContentLoaded", function (event){
 $ajaxUtils.sendGetRequest(nota_json,buildAndShowSelectionMenu,true); //pegando o Json do site e carregando as matérias
});

function buildAndShowSelectionMenu (notas){ //Insere o html na página

  $ajaxUtils.sendGetRequest(menuSelector,
    function(menuSelector){
      var text=buildSingleSelection(menuSelector, notas);
      insertHtml("#first-selection",text);
    },false)
};

function buildSingleSelection(menuSelector , notas){ //Itera sobre todas as matérias
  var finalHtml ="";

  for (var i=0; i< notas.length; i++){
    var html = menuSelector;
    var id = notas[i].id;
    var materia = notas[i].materia;
    html = insertProperty(html, "id", id);
    html = insertProperty(html, "materia", materia);
    finalHtml+= html;
  }
  return finalHtml;
}
 function buttonClicked(){ //Pega o index da materia escolhida
  return(document.getElementById("first-selection").selectedIndex); 
};

cm.loadResult = function(){ // Paga o json do server 
  showLoading("#notas");
  $ajaxUtils.sendGetRequest(nota_json,buildAndShowNotas,true);
};

function buildAndShowNotas(notas){ // insere o html de notas no index
  $ajaxUtils.sendGetRequest(notasHtml,
    function(notasHtml){
      var text= buildSingleNota(notasHtml,notas);
      insertHtml("#notas",text);
    }
    ,false)
};

function buildSingleNota(notasHtml,notas, id){ //monta o snippet de notas dado uma matéria 
  var id = buttonClicked();
  var finalHtml=notasHtml;
  var subject = notas[id];
  var objctProprieties = Object.keys(subject);
  var objctValues = Object.values(subject);
  for (var i=2; i<8; i++)
    finalHtml = insertProperty(finalHtml,objctProprieties[i],objctValues[i]);
  return finalHtml;
};

  /*
  var notaP1=document.getElementById("nota_p1").value;
  var pesoP1=document.getElementById("peso_p1").value;
  var notaP2=document.getElementById("nota_p2").value;
  var pesoP2=document.getElementById("peso_p1").value;
  var pesoP3=document.getElementById("peso_p3").value;
  var media=document.getElementById("media_pretendida").value;
  var finalMessage = calculaP3(notaP1,pesoP1,notaP2,pesoP2,pesoP3,media);
  var text = insertProperty(finalResult,"texto",finalMessage);
  insertHtml("#final-result",text);
  */

function calculaP3(notaP1,pesoP1,notaP2,pesoP2,pesoP3,mediaFinal){
  return ((mediaFinal*(pesoP3+pesoP2+pesoP1))-((notaP1*pesoP1)+(notaP2*pesoP2)))/pesoP3
};

function buildFinalResult(nota){
  var text="";
  if(nota>10){
    text = "Infelizmente você não consiguirá atingir a média desejada.";
  }else if(nota>5 && nota<=10){
    text="Atenção!! você precisa de " + nota.toString() + " na P3, para atingir a média desejada.";
  }else if(nota>0 && nota<=5){
    text="Você só precisa de " + nota.toString() + " na P3, para atingir a média desejada.";
  }else{
    text="Parabéns, você já alcançou a média desejada.";
  };
  return text;
};

global.$cm = cm;

})(window);

