
function mudaMes(mes){
	var mes1 = "<option value='1' selected='selected'> 1 </option> ";								// Define o mês de 28 dias
	for (var i=2; i<29; i++) mes1 += "<option value=" +i+ ">" +i+ "</option> ";				
	
	var mes2 = mes1 + "<option value=29>29</option> <option value=30>30</option> ";				// Define o mês de 30 dias
	var mes3 = mes2 + "<option value=31>31</option> ";											// Define o mês de 31 dias
	


	if (mes == 2){																				// Meses com 28 dias
		document.getElementById("dia").innerHTML = mes1;
	}
	if (mes == 4 || mes == 6 || mes == 9 || mes == 11){											// Meses com 30 dias
		document.getElementById("dia").innerHTML = mes2;
	}
	if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12){	// Meses com 31 dias
		document.getElementById("dia").innerHTML = mes3;
	}

	return false;
}

function qualMes(mes){
	mes = parseInt(mes);
	switch(mes){
		case  1: return "Janeiro";	break;
		case  2: return "Fevereiro";break;
		case  3: return "Março";	break;
		case  4: return "Abril";	break;
		case  5: return "Maio";		break;
		case  6: return "Junho";	break;
		case  7: return "Julho";	break;
		case  8: return "Agosto";	break;
		case  9: return "Setembro";	break;
		case 10: return "Outubro";	break;
		case 11: return "Novembro";	break;
		case 12: return "Dezembro";	break;
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function contaDias(dia,mes){
	var n = 0;
	var n0;

	switch (mes){
		case  1: n0 =   0; break;
		case  2: n0 =  31; break;
		case  3: n0 =  59; break;
		case  4: n0 =  90; break;
		case  5: n0 = 120; break;
		case  6: n0 = 151; break;						// Conta os dias até o último dia do mês anterior
		case  7: n0 = 181; break;
		case  8: n0 = 212; break;
		case  9: n0 = 243; break;
		case 10: n0 = 273; break;
		case 11: n0 = 304; break;
		case 12: n0 = 334; break;		
	}

	if (mes){ 
		if (dia){
			n = n0 + dia;								// Soma com os dias do mês selecionado
			return n;
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function calcDec(n){
	var sin1 = toRad(-23.44);
	var sin2 = toRad( (360*(n-2))/365.24);
	var cosA = 360*(n+10)/365.24;
	var cosB = (360/(60*Math.PI)) * Math.sin( sin2 );
	var cos  = toRad( ( cosA + cosB ) );

	var declinationArc = Math.sin( sin1 ) * Math.cos( cos );
	var declinationRad = Math.asin(declinationArc);
	var declinationDeg = toDeg(declinationRad);

	return declinationDeg;
}

function calcTheta(L,delta,H){
	var sin1 = toRad(L);
	var sin2 = toRad(delta);
	var cos1 = sin1;
	var cos2 = sin2;
	var cos3 = toRad(H);

	var thetaArc = Math.sin(sin1) * Math.sin(sin2) + Math.cos(cos1) * Math.cos(cos2) * Math.cos(cos3);
	var theta = toDeg( Math.acos(thetaArc) );

	return theta;
}

function calcPhi(L,delta,H,theta){
	var sin1 = toRad(delta);
	var cos1 = toRad(L);
	var cos2 = toRad(H);
	var cos3 = sin1;
	var sin2 = cos1;
	var sin3 = toRad(theta);

	var phiArc = ( Math.sin(sin1) * Math.cos(cos1) - Math.cos(cos2) * Math.cos(cos3) * Math.sin(sin2) ) / Math.sin(sin3);
	var phi = toDeg( Math.acos(phiArc) );

	if ( isNaN(phi) ){
		if(L<=0) phi = 0;
		else phi = 180;
	}
	else{
			if(H > 0) phi = 360 - phi;
			if(H < 0){}
	}

	return phi;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function horaToHHMM(h){
	var hora = Math.floor(Math.abs(h+12));
	var mins = Math.floor((Math.abs(h+12) * 60) % 60);
	var secs = Math.floor(((Math.abs(h+12) * 3600) % 60) % 60);
	
	return (hora < 10 ? "0" : "") + hora + "h " + (mins < 10 ? "0" : "") + mins + "m " + (secs < 10 ? "0" : "") + secs + "s ";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function timer(hora){
	setInterval( (hora = hora + 0.01) , 500);
}

function bgColor(alpha){
	var color;
	if(alpha){
		if(alpha > 5) color = "rgb(200,200,255)";
		else{
			if(alpha > -15) color = "rgb(" + parseInt(10 * (alpha + 15)) + "," + parseInt(10 * (alpha + 15)) + "," + parseInt(12.75 * (alpha + 15)) + ")";
			else color = "rgb(0,0,0)";
		}
	}
	else color = "rgb(0,0,0)";
	document.body.style.background = color;
}

function horColor(){
	var colors = [];
	var color0;
	var color1;
	if(alpha){
		if(alpha > 5){ color0 = "rgb(26,150,15)"; color1 = "rgb(11,120,6)"; }
		else{
			if(alpha > -15){
				color0 = "rgb(" + (6 + parseInt(1 * (alpha + 15))) + "," + (48 + parseInt(5.1 * (alpha + 15))) + "," + (2 + parseInt(0.65 * (alpha + 15))) + ")";
				color1 = "rgb(" + parseInt(0.55 * (alpha + 15)) + "," + parseInt(6 * (alpha + 15)) + "," + parseInt(0.3 * (alpha + 15)) + ")";
			}
			else{ color0 = "rgb(6,48,2)"; color1 = "rgb(0,0,0)"; }
		}
	}
	else{ color0 = "rgb(6,48,2)"; color1 = "rgb(0,0,0)"; }

	colors[0] = color0; colors[1] = color1;
	return colors;
}

function textColor(){
	var options = document.getElementById("options");
	var ajuda = document.getElementById("ajuda");
	var explica = document.getElementById("explica");
	var color;
	if(alpha){
		if(alpha > -4.99){ color = "black"; }
		else{
			if(alpha > -5){
				color = "rgb(" + (255 - parseInt(25500 * (alpha + 5))) + ",";
				color+=			 (255 - parseInt(25500 * (alpha + 5))) + ",";
				color+=			 (255 - parseInt(25500 * (alpha + 5))) + ")";
			}
			else{ color = "white "; }
		}
	}
	else{ color = "white"; }

	options.style.color = color;
	ajuda.style.color = color;
	ajuda.style.border.color = color;
	explica.style.color = color;
	explica.style.border.color = color;
}

function coordSol(L,cnv,phi,alpha,n){
	var coords = [];
	phiRad = toRad(phi);
	alphaRad = toRad(alpha);
	if(L < 0){													// Coordenadas em X
		if(phi < 180 && phi > 0)
			coords[0] = 1 * cnv.width  * (1 - 0.5 * triangCos(phiRad) );
		else
			coords[0] = 1 * cnv.width  * (0 + 0.5 * triangCos(phiRad) );
	}
	else{

		if(L == 0){

			if(n <= 182){
				if(phi < 180 && phi > 0)
					coords[0] = 1 * cnv.width  * (1 - 0.5 * triangCos(phiRad) );
				else
					coords[0] = 1 * cnv.width  * (0 + 0.5 * triangCos(phiRad) );
			}

			else{
				if(phi < 180 && phi > 0)
					coords[0] = 1 * cnv.width  * (0 - 0.5 * triangCos(phiRad) );
				else
					coords[0] = 1 * cnv.width  * (1 + 0.5 * triangCos(phiRad) );
			}				
		}


		else{
			if(phi < 180 && phi > 0)
				coords[0] = 1 * cnv.width  * (0 - 0.5 * triangCos(phiRad) );
			else
				coords[0] = 1 * cnv.width  * (1 + 0.5 * triangCos(phiRad) );
		}
	}
		
	coords[1] = cnv.height * (1 - triangSin(alphaRad) );		// Coordenadas em Y
	
	return coords;
}

function starsAlpha(alpha){
	var transp;
	if(alpha > 0) 
		transp = 0;
	else{
		if(alpha > -15)
			transp = (-alpha - 0)/15;
		else
			transp = 1;
	}
	return transp;
}