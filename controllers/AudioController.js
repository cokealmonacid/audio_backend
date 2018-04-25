const Audio       = require('../models').Audios;
const Transformer = require('../models').Transformers;
const Failure     = require('../models').Failures;
const Code        = require('../models').Code;

const fftService  = require('../services/fftService');

const create = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let err, audio, transformer, code, failures;
	let user 	   = req.user;
	let audio_info = req.body;

	transformer = await to(Transformer.findOne({where:{id: audio_info.transformerId}}));
	if (!transformer) return ReE(res, err, 422);

	code = await to(Code.findOne({where:{id: audio_info.codeId}}));
	if (!code) return ReE(res, err, 422);

	audio_info.UserId   = user.id;
	audio_info.analysis = false;
	failures = await to(Failure.findAll());
	if (!failures) return ReE(res, err, 422);

	failures = failures[1];
	for (let i in failures) {
		let failure = failures[i];
		let results = await to(fftService.analysisFFT(audio_info.content, failure.content));
		if (results[1].failure) {
			audio_info.analysis = true;
			break;
		}
	}

	[err, audio] = await to(Audio.create(audio_info));
	if (err) return ReE(res, err, 422);

	let audio_json = {
		'id' : audio.id,
		'results' : audio.analysis
	}

	return ReS(res, {audio: audio_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let user = req.user;
	let err, audios, transformer, code;

	[err, audios] = await to(Audio.findAll({where:{UserId: user.id}}));
	if (err) return ReE(res, err, 422);

	let audios_json = [];
	for (let i in audios){
		let audio = audios[i];

		transformer = await to(Transformer.findOne({where:{id: audio.TransformerId}}));
		if (!transformer) return ReE(res, err, 422);

		code = await to(Code.findOne({where:{id: audio.CodeId}}));
		if (!code) return ReE(res, err, 422);

		let audio_resp = {
			'id'  : audio.id,
			'date': audio.createdAt,
			'code': code[1].description,
			'transformer_brand': transformer[1].brand,
			'transformer_model': transformer[1].model
		}

		audios_json.push(audio_resp);
	}

	return ReS(res, {audios: audios_json});
}
module.exports.getAll = getAll;

const show = async function(req, res){
	let transformer, code;
	let audio = req.audio;

	transformer = await to(Transformer.findOne({where:{id: audio.TransformerId}}));
	if (!transformer) return ReE(res, err, 422);

	code = await to(Code.findOne({where:{id: audio.CodeId}}));
	if (!code) return ReE(res, err, 422);

	let audio_resp = {
		'id'  : audio.id,
		'date': audio.createdAt,
		'code': code[1].description,
		'analysis': audio.analysis,
		'content' : audio.content,
		'transformer_brand': transformer[1].brand,
		'transformer_model': transformer[1].model
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