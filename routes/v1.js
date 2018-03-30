const express 			= require('express');
const router 			= express.Router();

const custom 	        = require('./../middleware/custom');
const passport      	= require('passport');
const path              = require('path');

const UserController 	= require('./../controllers/UserController');
const AudioController 	= require('./../controllers/AudioController');
const FailController 	= require('./../controllers/FailController');
const ResultController 	= require('./../controllers/ResultController');

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
router.get(		'/audios/:audio_id', passport.authenticate('jwt', {session:false}), custom.audios, AudioController.show);
router.delete(  '/audios/:audio_id', passport.authenticate('jwt', {session:false}), custom.audios, AudioController.remove);

router.post(	'/failures',		     passport.authenticate('jwt', {session:false}), FailController.create);
router.get(		'/failures',		     passport.authenticate('jwt', {session:false}), FailController.getAll);
router.delete(  '/failures/:failure_id', passport.authenticate('jwt', {session:false}), custom.failures, FailController.remove);

router.get(		'/results/:audio_id/:failure_id',  passport.authenticate('jwt', {session:false}), custom.create_results, ResultController.createAnalysis);
router.get(     '/results',                        passport.authenticate('jwt', {session:false}), ResultController.getAll);
router.get(		'/results/:result_id',             passport.authenticate('jwt', {session:false}), custom.result, ResultController.show);
router.delete(  '/results/:result_id',             passport.authenticate('jwt', {session:false}), custom.result, ResultController.remove);

module.exports = router;