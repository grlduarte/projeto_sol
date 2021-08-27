var text = document.getElementById("texto");
var dias, decl, horario, solar, azimute, azimute2, latitude, latitude2, altura, altura2;
var flag;
var X, Y;

function recebeVar(started,n,delta,anghour,solhour,phi,phi2,L,alpha,alpha2){
	var not = "Inicie o programa";
	flag = started;

	if(flag){
		dias = n;
		decl = parseFloat(delta).toFixed(2) + "°";
		horario = parseFloat(anghour).toFixed(2) + "°";
		solar = parseFloat(solhour).toFixed(2) + "h";

		azimute  = parseFloat(phi).toFixed(2) + "°";
		azimute2 = parseFloat(phi2).toFixed(2) + "°";	

		altura  = parseFloat(alpha).toFixed(2) + "°";
		altura2 = parseFloat(alpha2).toFixed(2) + "°";

		latitude  = parseFloat(+L).toFixed(2) + "°";
		latitude2 = parseFloat(-L).toFixed(2) + "°";
	}
	else{
		dias = not;
		decl = not;
		horario = not;
		solar = not;
		azimute = not;
		azimute2 = not;
		latitude = not;
		latitude2 = not;
		altura = not;
		altura2 = not;
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
	document.getElementById("angAgora2").innerHTML = horario;
	document.getElementById("solAgora1").innerHTML = solar;

	document.getElementById("aziAgora1").innerHTML = azimute;
	document.getElementById("aziAgora2").innerHTML = azimute;
	document.getElementById("aziAgora3").innerHTML = azimute2;

	document.getElementById("altAgora1").innerHTML = altura;
	document.getElementById("altAgora2").innerHTML = altura;
	document.getElementById("altAgora3").innerHTML = altura2;

	document.getElementById("latAgora1").innerHTML = latitude;
	document.getElementById("latAgora2").innerHTML = latitude +  " (atual)";	
	document.getElementById("latAgora3").innerHTML = latitude2+ " (oposta)";
	document.getElementById("latAgora4").innerHTML = latitude +  " (atual)";	
	document.getElementById("latAgora5").innerHTML = latitude2+ " (oposta)";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

text.innerHTML = "<div id='homePag' style='display=block'>\
					<h3 style='text-align:center'> Onde estará o Sol?</h3> <br>\
					<p style='text-align: left'>Como sabemos, o eixo de rotação da terra não é perfeitamente paralelo ao\
					seu eixo de translação, existindo um ângulo de aproximadamente 23,5º entre eles. Tal inclinação é culpada\
					pela existência das estações e pelos diferentes posicionamentos do Sol num mesmo horário durante o ano.\
					<br><br>Assim, para responder essa pergunta precisamos conhecer as seguintes grandezas e como elas podem nos ajudar:\
					</p> <br><br>\
					\
					\
					<table style='text-align: left'>\
					\
					<tr> <td class='submenu' onClick='trocaPag(\"dec\");'>Declinação do Sol </td> <td> = </td> <td id='decAgora1'> " + decl + "</td> </tr>\
					<tr> <td class='submenu' onClick='trocaPag(\"ang\");'>Ângulo Horário </td> <td> = </td> <td id='angAgora1'> " + horario + "</td> </tr>\
					<tr> <td class='submenu' onClick='trocaPag(\"azi\");'>Azimute </td> <td> = </td> <td id='aziAgora1'> " + azimute + "</td> </tr>\
					<tr> <td class='submenu' onClick='trocaPag(\"alt\");'>Altura </td> <td> = </td> <td id='altAgora1'> " + altura + "</td> </tr>\
					<tr> <td class='submenu' onClick='trocaPag(\"lat\");'>Latitude </td> <td> = </td> <td id='latAgora1'> " + latitude + "</td> </tr>\
					\
					</table>\
					</div>";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					

text.innerHTML+= "<div id='decPag' style='display:none'>\
					<h4> Declinação do Sol em relação à Terra </h4> <br>\
					<p>Para saber onde o Sol aparecerá para um observador na Terra, a declinação é uma informação necessária.\
					A declinação junto com a ascenção reta ou o ângulo horário formam o sistema equatorial de coordenadas celestes,\
					comumente usado para localização de astros.<br><br> A declinação funciona como se fosse uma latitude na esfera celeste,\
					enquanto que o ângulo horário funciona como a longitude. Apesar da comparação, declinação e latitude\
					terrestre não devem ser confundidas. Ambas são independentes.</p>\
					<br><p>Para ter alguma noção,</p>\
					<br>\
					\
					<img src='image/declinação.gif' align='right' width=40%>\
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
					<h4> Ângulo horário do Sol em relação à Tera </h4> <br>\
					<p>A segunda informação que precisamos saber é o ângulo horário, que nada mais é do que os 15° para cada\
					uma das 24 horas. Nesse programa, como não levamos em conta a latitude e fusos horários, foi utilizada a hora\
					solar local.<br><br> Agora, tendo o ângulo horário, completamos o sistema equatorial de coordenadas celestes.\
					Utilizando comparação semelhante à feita com a declinação, o ângulo horário pode ser visto como a longitude celestial.\
					<br><br>\
					Na verdade, o ângulo horário é uma alternativa para a ascenção reta, que é uma medida semelhante, mas tem sentido oposto\
					e outra origem. Além disso, o ângulo horário varia de -180° a 180°, assim como a hora solar varia de -12h a 12h. </p>\
					<br><br>\
					\
					<table style='text-align:left'>\
					<tr> <td> Ângulo horário </td> <td id='angAgora2'> " + horario + "</td> </tr>\
					<tr> <td> Hora Solar </td> <td id='solAgora1'> " + solar + "</td> </tr>\
					</table>\
					\
					</div>";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

text.innerHTML+= "<div id='aziPag' style='display:none'>\
					<h4> Ângulo Azimute </h4> <br>\
					<p>O ângulo azimute é a primeira das coordenadas que precisamos para localizar o Sol ou qualquer astro estando na superfície\
					terrestre. Através de alguns cálculos com a declinação, ângulo horário e latitude, além do dia do ano e hora, é possível\
					chegar aos valores do ângulo azimute (e de altura, a segunda coordenada necessária).</p>\
					<br>\
					<p>Essa é uma coordenada angular e começa com 0° ao norte aumentando no sentido horário (<i>e.g.</i> 90° à leste, 180° ao sul e\
					270° à oeste). Note também que o azimute depende da latitude. Isso quer dizer que agora a localização do observador é\
					importante.</p>\
					<br>\
					<p>Sabemos que o sol corre do leste para oeste, então no hemisfério sul, durante o dia, o azimute varia de aproximadamente 90°\
					(leste) até 0° (norte) ao meio dia e então até aproximadamente 270° (oeste), ou seja, é decrescente. No hemisfério norte, do contrário,\
					o azimute é crescente: varia de aproximadamente 90° até 180° (sul) ao meio dia e então até aproximadamente 270°.</p>\
					<br>\
					\
					<img src='image/azimute.png' align='right' width=40%>\
					\
					<table style='text-align:left'>\
					<tr> <th> Latitude </th> <th> Azimute </th> </tr>\
					<tr> <td id='latAgora2'> " + latitude  + " (atual) </td> <td id='aziAgora2'> " + azimute  + " </td> </tr>\
					<tr> <td id='latAgora3'> " + latitude2 + " (oposta)</td> <td id='aziAgora3'> " + azimute2 + " </td> </tr>\
					</table>\
					\
					</div>";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

text.innerHTML+= "<div id='altPag' style='display:none'>\
					<h4> Ângulo de Altura </h4> <br>\
					<p>O ângulo de altura em par com o azimute nos fornece as coordenadas necessárias para olhar exatamente onde o sol estará.\
					Sendo um ângulo, varia de 0° no horizonte até 90° no zênite (o ponto mais alto do céu visível).</p>\
					<br>\
					<p>É a variável que mais percebemos mudar ao longo do ano: se comparado o sol do meio dia, é bastante pequena no inverno\
					e grande no verão do respectivo hemisfério.</p>\
					<br>\
					<p>Além disso, é perceptível a diferença de altura quando se varia a latitude:</p>\
					<br>\
					\
					<table style='text-align:left'>\
					<tr> <th> Latitude </th> <th> Altura </th> </tr>\
					<tr> <td id='latAgora4'> " + latitude  + " (atual) </td> <td id='altAgora2'> " + altura  + " </td> </tr>\
					<tr> <td id='latAgora5'> " + latitude2 + " (oposta)</td> <td id='altAgora3'> " + altura2 + " </td> </tr>\
					</table>\
					\
					</div>";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

text.innerHTML+= "<div id='latPag' style='display:none'>\
					<h4> Latitude </h4> <br>\
					<p>A latitude sem dúvidas é uma informação muito importante: o ângulo de altura do sol varia diretamente com essa medida.\
					Inclusive, em alguns pontos é possível observar fenômenos bastante interessantes, como o inverno no pólo sul ou os solstícios e\
					equinócios no equador.</p>\
					<br><br><br>\
					<center>\
					<img src='image/latitude.gif' width='80%'>\
					</center>\
					</div>";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
