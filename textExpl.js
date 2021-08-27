var text = document.getElementById("explica");
var dias, decl, azimute, lat, altura;
var flag;

function recebeVar(started,n,delta,phi,L,alpha){
	flag = started;

	if(flag){
		dias = n;
		decl = parseFloat(delta).toFixed(2);
		azimute = parseFloat(phi).toFixed(2);
		lat = parseFloat(L).toFixed(2);
		altura = parseFloat(alpha).toFixed(2);
	}
	else{
		dias = "Inicie o programa";
		decl = "Inicie o programa";
		azimute = "Inicie o programa";
		lat = "Inicie o programa";
		altura = "Inicie o programa";
	}
}

function homePag(){
	var home = " ";
	home  =	"<h3> Onde estárá o Sol?</h3> <br>\
			 <p style='text-align: left'>Para responder essa pergunta precisamos conhecer as seguintes grandezas:</p> <br><br>\
			 \
			 <table style='text-align: left'>\
			 \
			 <tr> <td onClick='changePag(2);'>Declinação magnética do Sol em relação a Terra = </td>  <td> " + decl + "</td> </tr>\
			 <tr> <td onClick='changePag(3);'>Azimute = </td> <td> " + azimute + "</td> </tr>\
			 <tr> <td onClick='changePag(4);'>Latitude = </td> <td> " + lat + "</td> </tr>\
			 \
			 </table>\
			 ";

	text.innerHTML = home;
}

function decPag(){
	var dectxt = " ";
	dectxt = "Declinação";

	text.innerHTML = dectxt;
}

function aziPag(){
	var azitxt = " ";
	azitxt = "Azimute";

	text.innerHTML = azitxt;
}