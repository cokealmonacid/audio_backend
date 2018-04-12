const Audio       = require('../models').Audios;
const Transformer = require('../models').Transformers;
const Result 	  = require('../models').Results;
const Failure     = require('../models').Failures;

const create = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let err, audio, transformer;
	let user 	   = req.user;
	let audio_info = req.body;

	transformer = await to(Transformer.findOne({where:{id: audio_info.transformerId}}));
	if (!transformer) return ReE(res, err, 422);

	audio_info.UserId   = user.id;
	audio_info.analysis = false;
	[err, audio] = await to(Audio.create(audio_info));
    if (err) return ReE(res, err, 422);

    let audio_json = {
    	'id' : audio.id,
    	'code': audio.code
    }

	return ReS(res, {audio: audio_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let user = req.user;
	let err, audios, transformer;

	[err, audios] = await to(Audio.findAll({where:{UserId: user.id}}));
	if (err) return ReE(res, err, 422);

	let audios_json = [];
	for (let i in audios){
		let audio = audios[i];

		transformer = await to(Transformer.findOne({where:{id: audio.TransformerId}}));
		if (!transformer) return ReE(res, err, 422);

		let audio_resp = {
			'id'  : audio.id,
			'date': audio.createdAt,
			'code': audio.code,
			'analysis': audio.analysis,
			'transformer_brand': transformer[1].brand,
			'transformer_model': transformer[1].model
		}

		audios_json.push(audio_resp);
	}

	return ReS(res, {audios: audios_json});
}
module.exports.getAll = getAll;

const show = async function(req, res){

	let audio = req.audio;

	transformer = await to(Transformer.findOne({where:{id: audio.TransformerId}}));
	if (!transformer) return ReE(res, err, 422);

	let audio_resp = {
		'id'  : audio.id,
		'date': audio.createdAt,
		'code': audio.code,
		'analysis': audio.analysis,
		'content' : audio.content,
		'transformer_brand': transformer[1].brand,
		'transformer_model': transformer[1].model
	}

	let results_json = [];
	if (audio.analysis) {
		let results = await to(Result.findAll({where: {AudioId: audio.id}}));
		if (!results) return ReE(res, err, 422);

		results = results[1];

		for (let i in results){
			let result = results[i];
			let failure = await to(Failure.findOne({where: {id: result.FailureId}}));
			if (!failure) return ReE(res, err, 422);

			failure = failure[1];
			audio_results = {
				'failure_name'    : failure.description,
				'result_analysis' : result.failure
			}

			results_json.push(audio_results);
		}

		audio_resp.results = results_json;
	}

	return ReS(res, {audio: audio_resp}, 201);
}
module.exports.show = show;

const remove = async function(req, res){
	let audio, err;
	audio = req.audio;

    [err, audio] = await to(audio.destroy());
    if(err) return ReE(res, 'Un error se ha producido al intentar eliminar una grabación de audio');

    return ReS(res, {message:'Grabación de audio eliminada'}, 204);	
}
module.exports.remove = remove;