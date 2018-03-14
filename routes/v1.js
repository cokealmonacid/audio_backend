const express 			= require('express');
const router 			= express.Router();

const passport      	= require('passport');
const path              = require('path');

const UserController 	= require('./../controllers/UserController');
const AudioController 	= require('./../controllers/AudioController');

require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post(    '/users',           UserController.create);
router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);   
router.post(    '/users/login',     UserController.login);

router.post(	'/audios',			 passport.authenticate('jwt', {session:false}), AudioController.create);
router.get(		'/audios',			 passport.authenticate('jwt', {session:false}), AudioController.getAll);
router.delete(  '/audios/:audio_id', passport.authenticate('jwt', {session:false}), AudioController.remove);

module.exports = router;