
$(function(){

	var finalResult = '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center"><div id="notaP3" style="color:{{cor}}">{{texto}}</div></div>';

	doTheMagic = function(){
		var notaP1 = parseFloat(document.getElementById("nota1").value,10);
		var pesoP1 = parseFloat(document.getElementById("peso1").value,10);
		var notaP2 = parseFloat(document.getElementById("nota2").value,10);
		var pesoP2 = parseFloat(document.getElementById("peso2").value,10);
		var pesoP3 = parseFloat(document.getElementById("peso3").value,10);
		var media  = parseFloat(document.getElementById("media-pretendida").value,10);
		var notaP3 = calculaP3(notaP1,pesoP1,notaP2,pesoP2,pesoP3,media);
		console.log(notaP3);
		var html = insertProperty(finalResult, "texto", buildFinalResult(notaP3));
		var html = insertProperty(html, "cor", changeColor(notaP3));
		insertHtml("#result",html);
		return null;
	};

	var insertHtml = function (selector, html) {
  	var targetElem = document.querySelector(selector);
  	targetElem.innerHTML = html;
	};

	var insertProperty = function (string, propName, propValue) {
  	var propToReplace = "{{" + propName + "}}";
  	string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  	return string;
	};

	function calculaP3(notaP1,pesoP1,notaP2,pesoP2,pesoP3,mediaFinal){
		return ((mediaFinal*(pesoP3+pesoP2+pesoP1))-((notaP1*pesoP1)+(notaP2*pesoP2)))/pesoP3;
	};

	function buildFinalResult(nota){
	  var text="";
	  if(nota>10){
	    text = "Infelizmente você não consiguirá atingir a média desejada.";
	  }else if(nota>5 && nota<=10){
	    text="Atenção!! Você precisa de " + nota.toFixed(2).toString() + " na P3, para atingir a média desejada.";
	  }else if(nota>0 && nota<=5){
	    text="Você só precisa de " + nota.toFixed(2).toString() + " na P3, para atingir a média desejada.";
	  }else{
	    text="Parabéns, você já alcançou a média desejada.";
	  };
	  return text;
	};

	function changeColor(nota){
	  if(nota>5){
	    return "red";
	  }else if (nota>0 && nota<=5){
	    return "#0040ff";//azul
	  }else{
	    return "#5af25a";//verde
	  };
	};

});