const Audio				= 	require('./../models').Audios;
const Failure			= 	require('./../models').Failures;
const Result		    = 	require('./../models').Results;
const Transformer		= 	require('./../models').Transformers;

let audios = async function (req, res, next) {
	let audio_id, err, audio;
	audio_id = req.params.audio_id;

	[err, audio] = await to(Audio.findOne({where:{id: audio_id}}));
	if (err) return ReS(res, "No se ha encontrado la grabación de audio");
	if (!audio) return ReE(res, "Audio no encontrado con id: "+audio_id);

	let user = req.user;
	if (audio.UserId != user.id) return ReE(res, "El usuario no tiene acceso a este audio");

	req.audio = audio;
	next();
} 
module.exports.audios = audios;

let failures = async function (req, res, next) {
	let failure_id, err, failure;
	failure_id = req.params.failure_id;

	[err, failure] = await to(Failure.findOne({where:{id: failure_id}}));
	if (err) return ReS(res, "No se ha encontrado la grabación de falla de audio");
	if (!failure) return ReE(res, "Falla no encontrado con id: "+failure_id);

	req.failure = failure;
	next();
} 
module.exports.failures = failures;

let create_results = async function (req, res, next) {
	let failure_id, audio_id, failure, audio, err;
	failure_id = req.params.failure_id;
	audio_id   = req.params.audio_id;

	[err, failure] = await to(Failure.findOne({where:{id: failure_id}}));
	if (err) return ReS(res, "No se ha encontrado la grabación de falla de audio");
	if (!failure) return ReE(res, "Falla no encontrado con id: "+failure_id);

	[err, audio] = await to(Audio.findOne({where:{id: audio_id}}));
	if (err) return ReS(res, "No se ha encontrado la grabación de audio");
	if (!audio) return ReE(res, "Audio no encontrado con id: "+audio_id);

	req.failure 	  = failure.content;
	req.audio   	  = audio.content;
	req.transformerId = audio.TransformerId;
	req.audio_id 	  = audio.id;
	req.user_id 	  = audio.UserId;
	req.failure_id	  = failure.id;
	next();
}
module.exports.create_results = create_results;

let result = async function (req, res, next) {
	let result_id, err, result;
	result_id = req.params.result_id;

	[err, result] = await to(Result.findOne({where:{id: result_id}}));
	if (err) return ReS(res, "No se ha encontrado el resultado de análisis");
	if (!result) return ReE(res, "Resultado de análisis no encontrado con id: "+result_id);

	req.result = result;
	next();
}
module.exports.result = result;

let transformer = async function (req, res, next) {
	let transformer_id, err, transformer;
	transformer_id = req.params.transformer_id;

	[err, transformer] = await to(Transformer.findOne({where:{id: transformer_id}}));
	if (err) return ReS(res, "No se ha encontrado el transformador solicitado");
	if (!transformer) return ReE(res, "Transformador no encontrado con id:"+transformer_id);

	req.transformer = transformer;
	next();
}
module.exports.transformer = transformer;