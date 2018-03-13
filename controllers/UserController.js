const User          = require('../models').User;
const authService   = require('./../services/AuthService');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if(!body.unique_key && !body.email){
        return ReE(res, 'Por favor, ingresa un email para registrar');
    } else if(!body.password){
        return ReE(res, 'Por favor, ingresa una contraseña para registrar');
    }else{
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Usuario creado satisfactoriamente', user:user.toWeb(), token:user.getJWT()}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, {user:user.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if(err){
        if(err.message=='Validation error') err = 'El email ingresado ya está registrado';
        return ReE(res, err);
    }
    return ReS(res, {message :'Updated User: '+user.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return ReE(res, 'Ha ocurrido un error al tratar de eliminar a un usuario');

    return ReS(res, {message:'Deleted User'}, 204);
}
module.exports.remove = remove;

const login = async function(req, res){
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {token:user.getJWT(), user:user.toWeb()});
}
module.exports.login = login;











