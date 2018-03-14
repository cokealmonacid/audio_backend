const Audio       = require('../models').Audios;
const Transformer = require('../models').Transformers;


const create = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let err, audio, transformer;
	let user 	   = req.user;
	let audio_info = req.body;

	transformer = await to(Transformer.findOne({where:{id: audio_info.transformerId}}));
	if (!transformer) return ReE(res, err, 422);

	audio_info.UserId = user.id;
	[err, audio] = await to(Audio.create(audio_info));
    if (err) return ReE(res, err, 422);

    let audio_json = audio.toWeb();

	return ReS(res,{audio: audio_json}, 201);
}
module.exports.create = create;