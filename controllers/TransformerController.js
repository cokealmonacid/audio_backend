const Transformer     = require('../models').Transformers;

const getAll = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let user = req.user;
	let err, transformers;

	[err, transformers] = await to(Transformer.findAll());
	if (err) return ReE(res, err, 422);

	let transformers_json = [];
	for (let i in transformers) {
		let transformer = transformers[i];
		let transformers_info = transformer.toWeb();

		transformers_json.push(transformers_info);
	}

	return ReS(res, {transformers: transformers_json});

}
module.exports.getAll = getAll;