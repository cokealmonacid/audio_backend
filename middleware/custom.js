const Audio				= 	require('./../models').Audios;
const Failure			= 	require('./../models').Failures;
const Transformer		= 	require('./../models').Transformers;
const Contact           =   require('./../models').Contact;
const Code        = require('../models').Code;

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

let contact = async function (req, res, next) {
	let audio_id, contact_id, audio, contact, transformer, code, err;

	audio_id   = req.body.audio_id;
	contact_id = req.body.contact_id;

	[err, audio] = await to(Audio.findOne({where: {id: audio_id}}));
	if (err) return ReS(res, "No se ha encontrado el audio solicitiado");
	if (!audio) return ReE(res, "Audio no encontrado con id:"+audio_id);

	[err, contact] = await to(Contact.findOne({where: {id: contact_id}}));
	if (err) return ReS(res, "No se ha encontrado el contacto solicitiado");
	if (!contact) return ReE(res, "Contacto no encontrado con id:"+contact_id);

	[err, transformer] = await to(Transformer.findOne({where: {id: audio.TransformerId}}));
	if (err) return ReS(res, "Se ha producido un error");
	if (!transformer) return ReE(res, "Se ha producido un error");

	[err, code] = await to(Code.findOne({where: {id: audio.CodeId}}));
	if (err) return ReS(res, "Se ha producido un error");
	if (!code) return ReE(res, "Se ha producido un error");


	audio.transformer = transformer.name_s_e+'-'+transformer.designation+'-'+transformer.brand;
	audio.analysis    = (audio.analysis == 1 ?  'Falla' : 'No Falla');
	audio.code        = code.description;
	audio.user        = req.user.email;
	req.contact       = contact.email;
	req.audio         = audio;
	next();
}
module.exports.contact = contact;