var altura = 0   // precisam ser declaradas no escopo global 
var largura = 0   // para estarem disponíveis fora da função
var vidas = 1
var tempo = 16 // 10 segundos
var mosquitosMortos = 0


var criaMosquitoTempo = 1500



//*********** seleciona o nível indicado na página index e altera a dificuldade (tempo)
var nivel = window.location.search //search recupera o '?' e tudo o que está após dele
	nivel = nivel.replace('?', '')

if(nivel === 'normal') {
	// 1500
	criaMosquitoTempo = 1500
} else if(nivel === 'dificil') {
	// 1000
	criaMosquitoTempo = 1000
} else if(nivel === 'chucknorris') {
	//750
	criaMosquitoTempo = 750
}




function ajustaTamanhoPalcoJogo(){
	altura = window.innerHeight
	largura = window.innerWidth

	//console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()



//******** define cronometro


var cronometro = setInterval(function() {
	
	tempo -= 1

	if(tempo < 0 ) {
		clearInterval(cronometro)
		clearInterval(criaMosquito)

		window.location.href = 'vitoria.html'

	}else {

	document.getElementById('cronometro').innerHTML = tempo //inner HTML pega todos os elementos contidos dentro de uma tag, nesse caso, span
	
	}

} , 1000)




//**************
// criando posições aleatórias para surgimento do mosquito


function posicaoRandomica() {
	

	//remover mosquito anterior (caso exista)
			// se tiver o mosquito, dará true, e será removido
	if(document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()




		// quando o mosquito é removido, a imagem do coração cheio é substituida pelo do coração vazio
		// a variavel vida recebe incremento de 1, selecionando V1, V2 e V3 (corresponde as 3 vidas)
		// quando a var vidas passa de 3, dá game over

		if(vidas > 5) { // fluxo de game over
		
			window.location.href = 'fim_de_jogo.html'
		
		} else {

		document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
		vidas++ // aumenta +1 a variavel vidas, atingindo v1, v2 e v3
		
		}

	}


	var posicaoX = Math.floor(Math.random() * largura) - 90 // para desconsiderar os 50px da imagem e evitar que 
	var posicaoY = Math.floor(Math.random() * altura) - 90 // fique cortada nas bordas da página

	posicaoX = posicaoX < 0 ? 0 : posicaoX // elimina a posibilidade de surgirem
	posicaoY = posicaoY < 0 ? 0 : posicaoY // numeros negativos devido ao -90


	//console.log(posicaoY, posicaoX)







	// criar o elemento html usando DOM (arvore de elementos html)
	var mosquito = document.createElement('img') // cria variável para elemento
	mosquito.src = 'imagens/mosquito.png'
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio() // chama função que cria classes de forma aleatória, alterando o tamanho e posição do mosquito
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function() { // remove o mosquito da tela quando é clicado
		this.remove() // faz referencia ao proprio elemento html que executa a função
		var contaMosquitos = mosquitosMortos++
		console.log(mosquitosMortos)

		document.getElementById('mosquitosMortos').innerHTML = mosquitosMortos 

 
	}

	document.body.appendChild(mosquito) // inclui o elemento no body
}





//**************
// cria tamanhos diferentes para o mosquito

function tamanhoAleatorio() { // cada classe configura tamanhos diferentes via cc
	var classe = Math.floor(Math.random() * 3)
	
	switch(classe) {
		case 0:
			return 'mosquito1'

		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}



// *************
//altera o lado do mosquito (virado para a direita ou para a esquerda)

function ladoAleatorio() {
		var classe = Math.floor(Math.random() * 2)
	
	switch(classe) {
		case 0:
			return 'ladoA'

		case 1:
			return 'ladoB'
	}

}