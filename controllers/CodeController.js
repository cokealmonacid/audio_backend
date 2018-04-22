const Code        = require('../models').Code;
const Transformer = require('../models').Transformers;

const create = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let err, code, transformer;
	let code_info = req.body;

	transformer = await to(Transformer.findOne({where:{id: code_info.transformerId}}));
	if (!transformer) return ReE(res, err, 422);

	[err, code] = await to(Code.create(code_info));
	if (err) return ReE(res, err, 422);

	return ReS(res, {code: code.toWeb()}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
	let err, codes, transformer;
	transformer = req.transformer;

	[err, codes] = await to(Code.findAll({where:{transformerId: transformer.id}}));
	if (err) return ReE(res, err, 422);

	let codes_json = [];
	for (let i in codes) {
		let code = codes[i];

		let codes_resp = {
			'id'          : code.id,
			'description' : code.description
		};

		codes_json.push(codes_resp);
	}

	return ReS(res, {codes: codes_json});
}
module.exports.getAll = getAll;