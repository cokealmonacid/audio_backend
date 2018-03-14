const Audio				= 	require('./../models').Audios;

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