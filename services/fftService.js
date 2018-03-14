let wav 	= require('node-wav');
let fft 	= require('./fft.js');
let Complex = require('complex.js');

const analysisFFT = function(input){

	let buffer 		= new Buffer(input, 'base64');
	let result = wav.decode(buffer);

	let y1 = result.channelData;
	y1     = y1[0];

	let img = Complex.i;
	let len = y1.length;
	let arrayI = new Array(len);
	arrayI.fill(0);

	fft.transform(y1, arrayI);

	let complexArray = new Array(len);
	for (let i = 0; i < len; i++) {

		complexArray[i] = new Complex(y1[i]/10000, arrayI[i]/10000);
	}

	let len2 = Math.floor(len/2) + 1;
	let complexArray2 = new Array(len2);
	for (let j = 0; j < len2 ; j++) {
		complexArray2[j] = new Complex(complexArray[j].re, complexArray[j].im);
	}

	let fsample = result.sampleRate;
	let data = new Array(len2);
	for (let k = 0; k < len2; k++) {
		abs 	= complexArray2[k].abs();   
		data[k] = (1/(fsample*len))*(Math.pow(abs, 2));
	}

	for (let l = 1; l < len2-1; l++) {
		data[l] = 2*data[l];
	}

	let maxV = data[0];
	for (let k = 0; k < len2; k++) {
		if(maxV < data[k]) maxV = data[k];
	}

	let len3 = data.length;
	for (let k = 0; k < len3; k++) {
		data[k] = data[k]/maxV;
	}

	let sum = 0;
	for (let k = 0; k < data.length; k++) {
		sum += data[k];
	}

	let espectro_medio = sum/data.length;
	return espectro_medio;
}
module.exports.analysisFFT = analysisFFT;