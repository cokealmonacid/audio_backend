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
		html    : 
		`<h3>Reporte de audio</h3>
		<p><strong>Nombre grabación: </strong>${audio.name}</p>
		<p><strong>Resultado Análisis: </strong>${audio.analysis}</p>
		<p><strong>Transformador: </strong>${audio.transformer}</p>
		<p><strong>Nº Serie: </strong>${audio.code}</p>
		<p><strong>Usuario: </strong>${audio.user}</p>
		`
	}

	transporter.sendMail(mailOptions, function(err, info){
		if (err) {
			return ReE(res, err);
		} else {
			return ReS(res, {message: 'Se ha enviado un informe por correo electrónico'});
		}
	})


}
module.exports.sendEmail = sendEmail;