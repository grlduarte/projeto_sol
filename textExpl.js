var text = document.getElementById("texto");
var dias, decl, horario, solar, azimute, latitude, altura;
var flag;

function recebeVar(started,n,delta,anghour,solhour,phi,L,alpha){
	var not = "Inicie o programa";
	flag = started;

	if(flag){
		dias = n;
		decl = parseFloat(delta).toFixed(2) + "°";
		horario = parseFloat(anghour).toFixed(2) + "°";
		solar = parseFloat(solhour).toFixed(2) + "°";
		azimute = parseFloat(phi).toFixed(2) + "°";
		latitude = parseFloat(L).toFixed(2) + "°";
		altura = parseFloat(alpha).toFixed(2) + "°";
	}
	else{
		dias = not;
		decl = not;
		horario = not;
		solar = not;
		azimute = not;
		latitude = not;
		altura = not;
	}
	mudaTexto();
}

var prevNext = "<table style='position:fixed; width:100%; padding-left:0px; bottom:15px; text-align:center'>\
					<tr>\
						<td onClick='prevPag();'> Anterior </td> <td> | </td>\
						<td onClick='trocaPag(\"home\");'> Início </td> <td> | </td>\
						<td onClick='nextPag();'> Próxima </td>\
					</tr>\
				</table>";

function mudaTexto(){
	document.getElementById("decAgora1").innerHTML = decl;
	document.getElementById("decAgora2").innerHTML = decl;

	document.getElementById("angAgora1").innerHTML = horario;
//	document.getElementById("angAgora2").innerHTML = horario;

	document.getElementById("aziAgora1").innerHTML = azimute;
//	document.getElementById("aziAgora2").innerHTML = azimute;

	document.getElementById("altAgora1").innerHTML = altura;
//	document.getElementById("altAgora1").innerHTML = altura;

	document.getElementById("latAgora1").innerHTML = latitude;
//	document.getElementById("latAgora1").innerHTML = latitude;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

text.innerHTML = "<div id='homePag' style='display=block'>\
					<h3> Onde estará o Sol?</h3> <br>\
					<p style='text-align: left'>Como sabemos, o eixo de rotação da terra não é perfeitamente paralelo ao\
					seu eixo de translação, existindo um ângulo de aproximadamente 23,5º entre eles. Tal inclinação é culpada\
					pela existência das estações e pelos diferentes posicionamentos do Sol num mesmo horário durante o ano.\
					<br><br>Assim, para responder essa pergunta precisamos conhecer as seguintes grandezas e como elas podem nos ajudar:\
					</p> <br><br>\
					\
					\
					<table style='text-align: left'>\
					\
					<tr> <td onClick='trocaPag(\"dec\");'>Declinação do Sol = </td> <td id='decAgora1'> " + decl + "</td> </tr>\
					<tr> <td onClick='trocaPag(\"ang\");'>Ângulo Horário = </td> <td id='angAgora1'> " + horario + "</td> </tr>\
					<tr> <td onClick='trocaPag(\"azi\");'>Azimute = </td> <td id='aziAgora1'> " + azimute + "</td> </tr>\
					<tr> <td onClick='trocaPag(\"alt\");'>Altura = </td> <td id='altAgora1'> " + altura + "</td> </tr>\
					<tr> <td onClick='trocaPag(\"lat\");'>Latitude = </td> <td id='latAgora1'> " + latitude + "</td> </tr>\
					\
					</table>\
					</div>";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					

text.innerHTML+= "<div id='decPag' style='display:none'>\
					<h4> Declinação do Sol em relação à Terra </h4> <br>\
					<p>Para saber onde o Sol aparecerá para um observador na Terra, a declinação é uma informação necessária.\
					A declinação junto com a ascenção reta ou o ângulo horário formam o sistema equatorial de coordenadas celestes,\
					comumente usado para localização de astros. A declinação funciona como se fosse uma latitude na esfera celeste,\
					enquanto que o ângulo horário funciona como a longitude. Apesar da comparação, declinação e latitude\
					terrestre não devem ser confundidas. Ambas são independentes.</p>\
					<br><p>Para ter alguma noção,</p>\
					<br>\
					\
					<table style='text-align:left'>\
					<tr> <th> Dia </th> <th> Declinação </th> </tr>\
					<tr> <td> 20 de março </td> <td> 0° </td> </tr>\
					<tr> <td> 21 de junho </td> <td> 23.44° </td> </tr>\
					<tr> <td> 22 de setembro </td> <td> 0° </td> </tr>\
					<tr> <td> 21 de dezembro </td> <td> -23.44° </td> </tr>\
					<tr> <td> Agora </td> <td id='decAgora2'> " + decl + "</td> </tr>\
					</table>\
					</div>";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

text.innerHTML+= "<div id='angPag' style='display:none'>\
					<h4> Ângulo horário </h4> <br>\
					</div>";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

text.innerHTML+= "<div id='aziPag' style='display:none'>\
					<h4> Ângulo Azimute </h4> <br>\
					</div>";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

text.innerHTML+= "<div id='altPag' style='display:none'>\
					<h4> Ângulo de Altura </h4> <br>\
					</div>";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

text.innerHTML+= "<div id='latPag' style='display:none'>\
					<h4> Latitude </h4> <br>\
					</div>";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

text.innerHTML+= "<div id='eqsPag' style='display:none'>\
					<h4> Equações </h4> <br>\
					</div>";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////