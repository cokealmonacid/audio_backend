const Contact    = require('../models').Contact;
const nodemailer = require('nodemailer');

const getAll = async function(req, res){
	let err, contacts;

	[err, contacts] = await to(Contact.findAll());
	if (err) return ReE(res, err, 422);

	let contacts_json = [];
	for (let i in contacts) {
		let contact = contacts[i];
		let contacts_info = contact.toWeb();

		contacts_json.push(contacts_info);
	}

	return ReS(res, {contacts: contacts_json});
}
module.exports.getAll = getAll;

// process.env.APP
const sendEmail = async function(req, res){
	let audio, contact;
	audio   = req.audio;
	contact = req.contact;

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	});

	let mailOptions = {
		from    : process.env.EMAIL_USER,
		to      : contact,
		subject : 'Correo con reporte de falla en grabación de transformador',
		text    : 'Esto es una prueba',
		//html
	}

	transporter.sendEmail(mailOptions, function(err, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent:', info);
		}
	})


}
module.exports.sendEmail = sendEmail;