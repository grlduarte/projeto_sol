var n;															// Número de dias passados desde o dia 1o de janeiro
var mes0;														// Guarda o mês selecionado
var dia0;														// Guarda o dia selecionado
var delta;														// Declinação do Sol
var phi;														// Azimute no sentido horário sendo que o Norte está em 0º
var L;															// Latitude escolhida
var horaSol;													// Hora solar
var horaDia;													// Hora do dia
var horaDeg;													// Ângulo horário
var theta;														// Elevação do sol até o Zênite // theta + alpha = 90º
var alpha;														// Elevação do horizonte até o Sol
var started = false;											// Flag para verificar se os dados foram inseridos corretamente
var timer;														// Armazena o timer
var spd;														// Velocidade da simulação
var optb;														// Armazena velocidade anterior ao pause
var optHidden = false;											// Flag para hidden das opções
var infoTime;													// Timer das informações
var infoHidden = true;											// Flag para hidden das informações
var alwaysShowInfo = false;										// Flag para informações não sumirem
var helpHidden = true;											// Flag para hidden do menu de ajuda
var explHidden = true;											// Flag para hidden do menu de explicação
var pag = 1;													// Guarda o número da página atual no menu de explicação

//////////////////////////////////////// FIM DAS DECLARAÇÕES DE VARIÁVEIS ////////////////////////////////////////



function salvaMes(mes){
	mes0 = parseInt(mes);
	dia0 = mudaMes(mes0);
	salvaDia(document.getElementById("dia").value);
}

function salvaDia(dia){
	dia0 = parseInt(dia);
//	n = contaDias(dia0,mes0);
}

function salvaLatitude(lat){
	L = parseFloat(lat);
	document.getElementById("mostraLat").innerHTML = L.toFixed(2) +"º";
}

function mudaHora(horaInput){
	salvaLatitude(document.getElementById("latitude").value);
	horaSol = parseFloat(horaInput);
	horaDeg = horaSol * 15;
	horaDia = horaToHHMM(horaSol);
	n = contaDias(dia0,mes0) + (horaSol + 12) / 24;
	document.getElementById("relogio").innerHTML = horaDia;
	refreshInfo();

	if(started) {
		calcGrandezas();
		enviaVar();
		bgColor(alpha);
		textColor();
		escreveExpl();
		desenhaCanvas();

		if(spd >= 0){
			if(horaSol < 12) document.getElementById("hora").value = horaSol + spd;
			else{
				document.getElementById("hora").value = -12;
				passaDia();
			}
		}
		else{
			if(horaSol > -12) document.getElementById("hora").value = horaSol + spd;
			else{
				document.getElementById("hora").value = +12;
				voltaDia();
			}
		}
	}
}

function passaDia(){
	var dia1 = document.getElementById("dia");
	var dia	 = document.getElementById("dia").value;
	var mes1 = document.getElementById("mes");
	var mes	 = document.getElementById("mes").value;

	if (mes == 2){																				// Meses com 28 dias
		if(dia == 28){ mes1.value++; salvaMes(mes1.value); }
		else{ dia1.value++; salvaDia(dia1.value); }
	}
	if (mes == 4 || mes == 6 || mes == 9 || mes == 11){											// Meses com 30 dias
		if(dia == 30){ mes1.value++; salvaMes(mes1.value); }
		else{ dia1.value++; salvaDia(dia1.value); }
	}
	if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10){					// Meses com 31 dias
		if(dia == 31){ mes1.value++; salvaMes(mes1.value); }
		else{ dia1.value++; salvaDia(dia1.value); }
	}
	if(mes == 12){
		if(dia == 31){ mes1.value = 1; salvaMes(mes1.value); }
		else{ dia1.value++; salvaDia(dia1.value); }
	}
}

function voltaDia(){
	var dia1 = document.getElementById("dia");
	var dia	 = document.getElementById("dia").value;
	var mes1 = document.getElementById("mes");
	var mes	 = document.getElementById("mes").value;

	if (mes == 3){																				// Meses com 28 dias
		if(dia == 1){
			mes1.value--; salvaMes(mes1.value);
			dia1.value = 28; salvaDia(dia1.value);
		}
		else{ dia1.value--; salvaDia(dia1.value); }
	}
	if (mes == 5 || mes == 7 || mes == 10 || mes == 12){										// Meses com 30 dias
		if(dia == 1){
			mes1.value--; salvaMes(mes1.value);
			dia1.value = 30; salvaDia(dia1.value);
		}
		else{ dia1.value--; salvaDia(dia1.value); }
	}
	if (mes == 2 || mes == 4 || mes == 6 || mes == 8 || mes == 9 || mes == 11){					// Meses com 31 dias
		if(dia == 1){
			mes1.value--; salvaMes(mes1.value);
			dia1.value = 31; salvaDia(dia1.value);
		}
		else{ dia1.value--; salvaDia(dia1.value); }
	}
	if (mes == 1){
		if(dia == 1){
			mes1.value = 12; salvaMes(mes1.value);
			dia1.value = 31; salvaDia(dia1.value);
		}
		else{ dia1.value--; salvaDia(dia1.value); }
	}
}

function calcGrandezas(){
	delta = calcDec(n);
	theta = calcTheta(L,delta,horaDeg);
	alpha = 90 - theta;
	phi = calcPhi(L,delta,horaDeg,theta);
}

function getKey(event){
	var key = event.which || event.keyCode;
	switch(key){
		case 32: case 80: case 112: togglePause();	break;
		case 73: case 105: toggleInfo();	break;
		case 72: case 104: toggleHelp();	break;
		case 77: case 109: toggleExpl();	break;
		case 83: case 115: toggleOpt();		break;

		case 43: increaseSpd();	break;
		case 45: decreaseSpd();	break;
	}
}

function getClick(){
	if(!helpHidden) toggleHelp();
	else toggleOpt();
}

function toggleOpt(){
	if(!optHidden){
		document.getElementById("options").style.display = "none";
		optHidden = true;
		showInfo();
	}
	else{
		document.getElementById("options").style.display = "block";
		optHidden = false;
		showInfo();
	}
}

function refreshInfo(){
	var info;
	info  = "Dia " +dia0+ " de " +qualMes(mes0)+ "<br>";
	info += "Latitude " +L+ "º <br>";
	info += horaDia+ "<br>";
	info += document.getElementById("velocidade").innerHTML+ "<br>";

	document.getElementById("info").innerHTML = info;
}

function showInfo(){
	var info = document.getElementById("info");
	refreshInfo();
	clearTimeout(infoTime);

	if(!alwaysShowInfo){
		if(optHidden){
			info.style.display = "block"; infoHidden = false;
			infoTime = setTimeout("info.style.display = 'none'; infoHidden = true;",5000);
		}
		else{
			info.style.display = "none";
			infoHidden = true;
		}
	}
}

function toggleInfo(){
	var info = document.getElementById("info");
	clearTimeout(infoTime);
	if(infoHidden){
		info.style.display = "block";
		infoHidden = false;
		alwaysShowInfo = true;
	}
	else{
		info.style.display = "none";
		infoHidden = true;
		alwaysShowInfo = false;
	}
}

function toggleHelp(){
	var ajuda = document.getElementById("ajuda");
	if(explHidden){
		if (helpHidden){
			ajuda.style.display = "block";
			helpHidden = false;
		}
		else{
			ajuda.style.display = "none";
			helpHidden = true;
		}
	}
	else{
		toggleExpl();
		if (helpHidden){
			ajuda.style.display = "block";
			helpHidden = false;
		}
		else{
			ajuda.style.display = "none";
			helpHidden = true;
		}
	}
}

function toggleExpl(){
	var explica = document.getElementById("explica");
	if(helpHidden){
		if (explHidden){
			explica.style.display = "block";
			explHidden = false;
		}
		else{
			explica.style.display = "none";
			explHidden = true;
		}
	}
	else{
		toggleHelp();
		if (explHidden){
			explica.style.display = "block";
			explHidden = false;
		}
		else{
			explica.style.display = "none";
			explHidden = true;
		}
	}
}

function togglePause(){
	if(spd != 0){
		optb = document.getElementById("speed").value;
		document.getElementById("speed").value = 0;
		setSpd(0);
	}
	else{
		setSpd(optb);
		document.getElementById("speed").value = optb;
		optb = 0;
	}
}

function increaseSpd(){
	var range = document.getElementById("speed");
	if(range.value < parseInt(range.max) ){
		range.value++;
		setSpd(range.value);
	}
}

function decreaseSpd(){
	var range = document.getElementById("speed");
	if(range.value > parseInt(range.min) ){
		range.value--;
		setSpd(range.value);
	}
}

function setSpd(opt){
	opt = parseInt(opt);
	switch(opt){
		case -2: spd = -1/25;		break;
		case -1: spd = -1/1500;		break;
		case  0: spd =  0;			break;
		case  1: spd =  1/90000;	break;
		case  2: spd =  1/1500;		break;
		case  3: spd =  1/150;		break;
		case  4: spd =  1/25;		break;
		case  5: spd = 24/25;		break;
	}
	if(opt == 1) document.getElementById("velocidade").innerHTML = 90000 * spd + "x (Tempo real)";
	else{
		if(opt == 5) document.getElementById("velocidade").innerHTML = 90000 * spd + "x (Ultra-rápido)";
		else{
			if(opt == 0) document.getElementById("velocidade").innerHTML = "Pause";
			else document.getElementById("velocidade").innerHTML = 90000 * spd + "x";
		}
	}
	showInfo();
}

function toggle(){
	if(started) stop();
	else start();
}

function start(){
	if(!mes0) alert("Selecione um mês!");
	else{
		if(!dia0) alert("Selecione um dia!");
		else{
			started = true;
			document.getElementById("toggle").value = "Pare";
			timer = setInterval("mudaHora( document.getElementById('hora').value );",40);		// Define um timer de 25 quadros por segundo
		}
	}
}

function stop(){
	started = false;
	clearInterval(timer);
	document.getElementById("toggle").value = "Começar!";
}

function desenhaCanvas(){
	var cnv = document.getElementById("cenario");
	var ctx = cnv.getContext("2d");
		cnv.width = window.innerWidth;
		cnv.height = window.innerHeight;

	var coords = coordSol(L,cnv,phi,alpha);
	var x = parseFloat(coords[0]);	var y = parseFloat(coords[1]);

	var h = 50;		// Altura do horizonte;
	ctx.clearRect(0,0,cnv.width,cnv.height);	
	
//////////////// Desenha o sol
	var radGradient = ctx.createRadialGradient(x,y,5,x,y,105);
	radGradient.addColorStop(  0 , 'yellow');
	radGradient.addColorStop(0.10, 'orange');
	radGradient.addColorStop(0.50, document.body.style.backgroundColor);

	ctx.translate(0,-h);
	ctx.beginPath();
	ctx.arc(x,y,200,0,2 * Math.PI);
	ctx.fillStyle = radGradient;
	ctx.fill();
	ctx.translate(0,+h);
	ctx.closePath();

//////////////// Desenha o horizonte
	var colors = horColor(alpha);
	var horColor0 = colors[0]; var horColor1 = colors[1];

	var linGradient = ctx.createLinearGradient(0,cnv.height,0,cnv.height-h);
	linGradient.addColorStop(  0 , horColor0);
	linGradient.addColorStop(0.75, horColor0);
	linGradient.addColorStop(  1 , horColor1);

	ctx.beginPath();
	ctx.rect(0,cnv.height-h,cnv.width,h);
	ctx.fillStyle = linGradient;
	ctx.fill();;
	ctx.closePath();

//////////////// Escreve os pontos cardeais
	ctx.beginPath();
	ctx.font = "30px Arial";
	ctx.fillStyle = "red";
	if(L <= 0){
		ctx.fillText("O",15, cnv.height - 15);
		ctx.fillText("N",cnv.width / 2, cnv.height - 15);
		ctx.fillText("L",cnv.width - 30, cnv.height - 15);
	}
	else{
		ctx.fillText("L",15, cnv.height - 15);
		ctx.fillText("S",cnv.width / 2, cnv.height - 15);
		ctx.fillText("O",cnv.width - 30, cnv.height - 15);
	}
	ctx.closePath();
}

function escreveExpl(){
	switch(pag){
		case 1:	homePag();	break;
		case 2: decPag();	break;
		case 3: aziPag();	break;
	}
}

function nextPag(){
	if(pag < 2) pag++;
	else{}
}

function prevPag(){
	if(pag > 1) pag--;
	else{}
}

function changePag(pagina){
	pag = parseInt(pagina);
	escreveExpl();
}

function enviaVar(){
	recebeVar(started,n,delta,phi,L,alpha);
}