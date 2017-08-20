var tempoInicial = $("#contagem").text();
var campo=$(".campoTexto");


$(function(){
	contaFrase();
	contarPalavras();
	iniciarTempo();
	ReiniciaJogo();
	inicializaMarcadores();
});



function contaFrase(){
var frase = $(".frase").text();
var np = frase.split(" ").length-1;
var tamanhoFrase= $("#tamanho");
tamanhoFrase.text(np);
}

function inicializaMarcadores(){

campo.addClass("campoNeutro");
campo.on("input", function(){
	var digitado = campo.val();
	var frase = $(".frase").text();
	var comparavel = frase.substr(0,digitado.length);
	

	if (digitado == comparavel){
		campo.removeClass("campoNeutro");
		campo.addClass("campoCorreto");
		campo.removeClass("campoErrado");
	}
	else{
		campo.removeClass("campoNeutro");
		campo.addClass("campoErrado");
		campo.removeClass("campoCorreto");
	}

});
}




function contarPalavras(){
campo.on("input", function(){
	var conteudo = campo.val();
	var qtdPalavras = conteudo.split(/\S+/).length-1;

	$("#palavrasDigitadas").text(qtdPalavras);

	var qtdletras = conteudo.length;

	$("#caracteres").text(qtdletras);

});
}

function iniciarTempo(){
		var tempo = $("#contagem");
	var falta = tempo.text();
	campo.one("focus", function(){
		var cronometro = setInterval(function(){
			$("#botaoReiniciar").attr("disabled", true);
			if(falta>0){
			falta--;
			tempo.text(falta);
		}else {
			$("#botaoReiniciar").attr("disabled", false);
			finalizaJogo();
			clearInterval(cronometro);
		}
		},1000);
	});

}

function finalizaJogo(){
			campo.attr("disabled", true);
			campo.addClass("campo-desativado");
			atualizaScore();
}


function ReiniciaJogo(){
	$("#botaoReiniciar").click(function(){
		campo.attr("disabled", false);
		campo.removeClass("campo-desativado");
		campo.val("");
		$("#caracteres").text("0");
		$("#palavrasDigitadas").text("0");
		$("#contagem").text(tempoInicial);
		iniciarTempo();
		inicializaMarcadores();
	})
}

	function atualizaScore(){
		var corpoTabela = $(".placar").find("tbody");
		var usuario = "Gerson";
		var numPalavras = $("#palavrasDigitadas").text();

		var linha = novaLinha(usuario, numPalavras);
		linha.find(".botaoRemover").click(removeLinha);

		corpoTabela.prepend(linha);
	}

	function novaLinha(usuario, palavras){
		var linha = $("<tr>");
		var colunaUsuario = $("<td>").text(usuario);
		var colunaPalavras = $("<td>").text(palavras);
		var colunaRemover = $("<td>");
		var link = $("<a>").addClass("botaoRemover").attr("href", "#");
		var icone = $("<i>").addClass("small").addClass("material-icons").text("clear");
	

		link.append(icone);
		colunaRemover.append(link);
		linha.append(colunaUsuario);
		linha.append(colunaPalavras);
		linha.append(colunaRemover);


		return linha;
	}

	function removeLinha(event){
		event.preventDefault();
		$(this).parent().parent().remove();
}

