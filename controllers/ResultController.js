const Result		  = require('../models').Results;
const Audio       = require('../models').Audios;
const fftService      = require('./../services/fftService');

const createAnalysis = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let err, response;
	let audio   = req.audio;
	let failure = req.failure;

	let results = await to(fftService.analysisFFT(audio, failure));

	results = {
		'UserId'		: req.user_id,
		'AudioId'       : req.audio_id,
		'FailureId'     : req.failure_id,
		'TransformerId' : req.transformerId,
		'rms_total'     : results[1].rms_total,
		'crest'			: results[1].crest,
		'peak'			: results[1].peak,
		'failure'		: results[1].failure
	}

	console.log(typeof results);

	[err, response]      = await to(Result.create(results));
	if (err) return ReE(res, err, 422);

	[err, audio] = await to(Audio.findOne({where: {id: req.audio_id}}));
	audio.analysis = true;
	[err, audio] = await to(audio.save());
	if (err) return ReE(res, err, 422);

	let result_json = response.toWeb();

	return ReS(res, {results: result_json}, 201);
}
module.exports.createAnalysis = createAnalysis;

const getAll = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let user = req.user;
	let err, results;

	[err, results] = await to(Result.findAll({where:{UserId: user.id}}));
	if (err) return ReE(res, err, 422);

	let results_json = [];
	for (let i in results) {
		let result = results[i];
		let results_info = result.toWeb();

		results_json.push(results_info);
	}

	return ReS(res, {results: results_json});

}
module.exports.getAll = getAll;

const show = async function(req, res){

	let result = req.result;

	let result_json = result.toWeb();

	return ReS(res, {result: result_json}, 201);
}
module.exports.show = show;

const remove = async function(req, res){
	let result, err;
	result = req.result;

    [err, result] = await to(result.destroy());
    if(err) return ReE(res, 'Un error se ha producido al intentar eliminar un reusltado de análisis');

    return ReS(res, {message:'Resultado de análisis eliminado'}, 204);	
}
module.exports.remove = remove;
