let wav 	     = require('node-wav');
let fft 	     = require('./fft.js');
let Complex      = require('complex.js');
let path         = require('path');
let fs = require('fs');

const analysisFFT = async function(input_audio, input_failure){

	/* 	AUDIO SAMPLED
		Get the input on base64 encoded and create a new buffer 
		then load the input and transform to sampled data
	*/

	let sample = await new Promise(function(resolve, reject) {
		fs.writeFile('services/input_audio.aac', input_audio, {encoding: 'base64'}, function(err) {

			let buffer  = fs.readFileSync('./services/input_audio.aac');
			let result 	= wav.decode(buffer);
			let fsample = result.sampleRate;

			/* Define array fullfiled with zeros and another with sampled data */
			let y1            = (result.channelData)[0];
			let len_sampled   = y1.length;
			let complex_array = new Array(len_sampled);
			let zeros         = (new Array(len_sampled)).fill(0);

			let sampled_FFT   = fastFourierTransform(fsample, complex_array, y1, zeros, len_sampled);
			let frequency     = rangeAnalysis(fsample, len_sampled);

			response = {
				'sample'      : sampled_FFT,
				'frequency_1' : frequency.frec1,
				'frequency_2' : frequency.frec2
			}

			resolve(response);
		});
	});

	/* 	FAILURE SAMPLED
		Get the input on base64 encoded and create a new buffer 
		then load the input and transform to sampled data
	*/
	let failure = await new Promise(function(resolve, reject){
		fs.writeFile('services/input_failure.aac', input_failure, {encoding: 'base64'}, function(err) {

			let buffer_failure 	= fs.readFileSync('./services/input_failure.aac');
			let result_failure = wav.decode(buffer_failure);
			let fsample = result_failure.sampleRate;

			/* Define array fullfiled with zeros and another with sampled data */
			let y1_failure    = (result_failure.channelData)[0];
			let len_failure   = y1_failure.length;
			let complex_array = new Array(len_failure);
			let zeros         = (new Array(len_failure)).fill(0);

			let failure_FFT   = fastFourierTransform(fsample, complex_array, y1_failure, zeros, len_failure);

			response = {
				'failure' : failure_FFT
			}

			resolve(response);
		});
	});

	let leng = sample.sample.length;
	let difeEsp = new Array(leng);
	for (let i = 0; i < leng; i++) {
		difeEsp[i] = Math.abs(failure.failure[i] - sample.sample[i]) / sample.sample[i];
	}

	let rmstotal = average(difeEsp);
	let rms      = average(difeEsp.slice(sample.frequency_1, sample.frequency_2));

	let maxArray = difeEsp.slice(sample.frequency_1, sample.frequency_2);
	let peak = maxArray[0];
	for (let k = 0; k < maxArray.length; k++) {
		if(peak < maxArray[k]) peak = maxArray[k];
	}

	let crest = peak/rms;
	return response = {
		peak      : peak,
		crest     : crest,
		rms_total : rmstotal,
		failure   : (crest > 15) ? true : false
	}

}
module.exports.analysisFFT = analysisFFT;


const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

function fastFourierTransform(fsample, complex_array, sampled_array, zeros, len_sampled) {
	/* Fast Fourier Transform */
	fft.transform(sampled_array, zeros);
	for (let i = 0; i < len_sampled; i++) {
		complex_array[i] = new Complex(sampled_array[i]/10000, zeros[i]/10000);
	}

	/* Half of the signal due by period */
	let len_half  = Math.floor(len_sampled/2) + 1;
	complex_array = complex_array.slice(0, len_half);

	let psdx = new Array(len_half);
	for (let k = 0; k < len_half; k++) {
		abs 	= complex_array[k].abs();   
		psdx[k]    = (1/(fsample*len_sampled))*(Math.pow(abs, 2));
	}

	for (let l = 1; l < len_half-1; l++) {
		psdx[l] = 2*psdx[l];
	}

	// Max value of array
	let maxV = psdx[0];
	for (let k = 0; k < len_sampled; k++) {
		if(maxV < psdx[k]) maxV = psdx[k];
	}

	let len_psdx = psdx.length;
	for (let k = 0; k < len_psdx; k++) {
		psdx[k] = psdx[k]/maxV;
	}

	return psdx;
}

function rangeAnalysis(fsample, len_sampled) {

	let leng = Math.floor((len_sampled/2)+ 1);
	let calc = fsample/len_sampled;
	let frec = new Array(leng);
	for (let i  = 0; i < leng; i ++) {
		frec[i] = calc*i;
	}

	let response = {
		frec1: findIndexArray(5000, 'last', frec),
		frec2: findIndexArray(9000, 'first', frec)
	}

	return response;
}

function findIndexArray(value, direction, array) {

	let leng     = array.length;

	if (direction === 'first') {

		for (let i = 0; i < leng; i++) {

			if (array[i] > value) {
				return i;
			}
		}
	} else {

		for (let j = leng; j > 0; j--) {
			if (array[j] < value) {
				return j;
			}
		}
	}

	return -1;
}