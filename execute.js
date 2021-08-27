var n;							// Número de dias passados desde o dia 1o de janeiro
var mes0;						// Guarda o mês selecionado
var dia0;						// Guarda o dia selecionado
var delta;						// Declinação do Sol
var phi;						// Azimute no sentido horário sendo que o Norte está em 0º
var L = -27.5967;				// Latitude escolhida
var horaSol = -6;				// Hora solar
var horaDia;					// Hora do dia
var horaDeg;					// Ângulo horário
var theta;						// Elevação do sol até o Zênite // theta + alpha = 90º
var alpha;						// Elevação do horizonte até o Sol
var started = false;			// Variável para verificar se os dados foram inseridos corretamente
var timer;						// Armazena o timer
var spd = 1/1500;				// Velocidade da simulação


//////////////////////////////////////// FIM DAS DECLARAÇÕES DE VARIÁVEIS ////////////////////////////////////////



function salvaMes(mes){
	mes0 = parseInt(mes);
	dia0 = mudaMes(mes0);
}

function salvaDia(dia){
	dia0 = parseInt(dia);
	n = contaDias(dia0,mes0);
}

function salvaLatitude(lat){
	L = parseFloat(lat);

}

function mudaHora(horaInput){
	horaSol = parseFloat(horaInput);
	horaDeg = horaSol * 15;
	horaDia = horaToHHMM(horaSol);
	document.getElementById("relogio").innerHTML = horaDia;

	if(started) {
		calcGrandezas();
		cenarioCanvas();
		if(horaSol < 12) document.getElementById("hora").value = horaSol + spd;
		else document.getElementById("hora").value = -12;
	}
}

function calcGrandezas(){
	theta = calcTheta(L,delta,horaDeg);
	alpha = 90 - theta;
	phi = calcPhi(L,delta,horaDeg,theta);
	bgColor(alpha);


	console.log("phi= " +phi);
	console.log("alpha= " +alpha);
}

function start(){
	if(!mes0) alert("Selecione um mês!");
	else{
		if(!dia0) alert("Selecione um dia!");
		else{
			delta = calcDec(n);
			salvaLatitude(document.getElementById("latitude").value);
			started = true;
			document.getElementById("toggle").value = "Pare";
			setTimer();
		}
	}
}

function stop(){
	started = false;
	clearInterval(timer);
	document.getElementById("toggle").value = "Começar!";
}

function toggle(){
	if(started) stop();
	else start();
}

function setSpd(n){
	n = parseInt(n);
	switch(n){
		case -1: spd = 1/90000;		break;
		case  0: spd = 0;			break;
		case  1: spd = 1/1500;		break;
		case  2: spd = 1/150;		break;
		case  3: spd = 1/25;		break;
	}
	if(n == (-1) ) document.getElementById("velocidade").innerHTML = "1x (Tempo real)";
	else{
		if( n == 0) document.getElementById("velocidade").innerHTML = "Pause";
		else document.getElementById("velocidade").innerHTML = 90000 * spd + "x";
	}
}

function setTimer(){
	clearInterval(timer);
	timer = setInterval("mudaHora( document.getElementById('hora').value );",40);		// Define um timer de 25 quadros por segundo
}

function cenarioCanvas(){
	var cnv = document.getElementById("cenario");
	var ctx = cnv.getContext("2d");
	var coords = [];

	//////////////// Desenha o horizonte
	/*	ctx.beginPath();
		ctx.rect(0,550,1550,50);
		ctx.fillStyle = "green";
		ctx.fill();*/
	
	//////////////// Desenha o sol
		coords = desenhaSol(phi,alpha);
		ctx.beginPath();
		ctx.arc(coords[0],coords[1],10,0,2*Math.PI,true);
		ctx.fillStyle = "yellow";
		ctx.fill();

}