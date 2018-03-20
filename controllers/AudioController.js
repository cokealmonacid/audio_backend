const Audio       = require('../models').Audios;
const Transformer = require('../models').Transformers;

const fftService  = require('./../services/fftService');


const create = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let err, audio, transformer, spectre;
	let user 	   = req.user;
	let audio_info = req.body;

	transformer = await to(Transformer.findOne({where:{id: audio_info.transformerId}}));
	if (!transformer) return ReE(res, err, 422);

	audio_info.UserId  = user.id;
	audio_info.spectre = fftService.analysisFFT(audio_info.content);
	[err, audio] = await to(Audio.create(audio_info));
    if (err) return ReE(res, err, 422);

    let audio_json = audio.toWeb();

	return ReS(res, {audio: audio_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let user = req.user;
	let err, audios;

	[err, audios] = await to(Audio.findAll({where:{UserId: user.id}}));
	if (err) return ReE(res, err, 422);

	let audios_json = [];
	for (let i in audios){
		let audio = audios[i];
		let audio_info = audio.toWeb();

		audios_json.push(audio_info);
	}

	return ReS(res, {audios: audios_json});
}
module.exports.getAll = getAll;

const remove = async function(req, res){
	let audio, err;
	audio = req.audio;

    [err, audio] = await to(audio.destroy());
    if(err) return ReE(res, 'Un error se ha producido al intentar eliminar una grabación de audio');

    return ReS(res, {message:'Grabación de audio eliminada'}, 204);	
}
module.exports.remove = remove;