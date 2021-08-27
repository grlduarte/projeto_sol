function triangSin(radians){
	var a  = 2/Math.PI;
	var b1 = 0;	var b2 = 2; var b3 = -4;

	if(radians >= -Math.PI / 2 && radians < Math.PI / 2)	return (radians * a + b1);
	else return;
}

function triangCos(radians){
	var a  = 2/Math.PI;
	var b1 = 1;	var b2 = -3;

	if(radians >= 0 && radians < Math.PI)	return (-1*radians * a + b1);

	else{
		if(radians >= Math.PI && radians <= 2 * Math.PI)	return (radians * a + b2);
		else return;
	}
}

function triangSinD(degrees){
	return triangSin(toRad(degrees));
}

function triangCosD(degrees){
	return triangCos(toRad(degrees));
}

function toRad(degrees){
	return degrees * Math.PI / 180;
}
function toDeg(radians){
	return radians * 180 / Math.PI;
}

function sin(radians){
	return Math.sin(radians);
}

function cos(radians){
	return Math.cos(radians);
}

function sinD(degrees){
	return sin(toRad(degrees));
}

function cosD(degrees){
	return cos(toRad(degrees));
}