const express 			= require('express');
const router 			= express.Router();

const custom 	        = require('./../middleware/custom');
const passport      	= require('passport');
const path              = require('path');

const UserController 			= require('./../controllers/UserController');
const AudioController 			= require('./../controllers/AudioController');
const FailController 			= require('./../controllers/FailController');
const TransformerController 	= require('./../controllers/TransformerController');
const CodeController            = require('./../controllers/CodeController');
const ContactController         = require('./../controllers/ContactController');

require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post(    '/users',           UserController.create);
router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);   
router.post(    '/users/login',     UserController.login);

router.get(      '/transformers',   passport.authenticate('jwt', {session: false}), TransformerController.getAll);

router.post(	'/audios',			 passport.authenticate('jwt', {session:false}), AudioController.create);
router.get(		'/audios',			 passport.authenticate('jwt', {session:false}), AudioController.getAll);
router.get(		'/audios/:audio_id', passport.authenticate('jwt', {session:false}), custom.audios, AudioController.show);
router.delete(  '/audios/:audio_id', passport.authenticate('jwt', {session:false}), custom.audios, AudioController.remove);

router.post(	'/failures',		     passport.authenticate('jwt', {session:false}), FailController.create);
router.get(		'/failures',		     passport.authenticate('jwt', {session:false}), FailController.getAll);
router.delete(  '/failures/:failure_id', passport.authenticate('jwt', {session:false}), custom.failures, FailController.remove);

router.get(     '/codes/:transformer_id',          passport.authenticate('jwt', {session:false}), custom.transformer, CodeController.getAll);
router.post(    '/codes'                ,          passport.authenticate('jwt', {session:false}), CodeController.create);

router.get(     '/contact',         passport.authenticate('jwt', {session:false}), ContactController.getAll);
router.post(    '/contact/email',   passport.authenticate('jwt', {session:false}), custom.contact, ContactController.sendEmail);

module.exports = router;