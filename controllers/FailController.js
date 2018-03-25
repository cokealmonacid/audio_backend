const Failure		  = require('../models').Failures;
const Transformer = require('../models').Transformers;

const fftService  = require('./../services/fftService');

const create = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let err, failure, transformer;
	let user 	   = req.user;
	let failure_info = req.body;

	transformer = await to(Transformer.findOne({where:{id: failure_info.transformerId}}));
	if (!transformer) return ReE(res, err, 422);

	[err, failure] = await to(Failure.create(failure_info));
    if (err) return ReE(res, err, 422);

    let failure_json = failure.toWeb();

	return ReS(res, {failure: failure_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	let user = req.user;
	let err, failures;

	[err, failures] = await to(Failure.findAll());
	if (err) return ReE(res, err, 422);

	let failures_json = [];
	for (let i in failures){
		let failure = failures[i];
		let failure_info = failure.toWeb();

		failures_json.push(failure_info);
	}

	return ReS(res, {failures: failures_json});
}
module.exports.getAll = getAll;

const remove = async function(req, res){
	let failure, err;
	failure = req.failure;

    [err, failure] = await to(failure.destroy());
    if(err) return ReE(res, 'Un error se ha producido al intentar eliminar una grabación de falla');

    return ReS(res, {message:'Grabación de falla eliminada'}, 204);	
}
module.exports.remove = remove;