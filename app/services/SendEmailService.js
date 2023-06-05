const nodemailer = require('nodemailer');

module.exports = {
	// * Funcion para enviar al correo
	async sendMail(token, user) {
		console.log('Se esta enviando un correo.');
		try {
			// TODO: nodemailer
			const transporter = nodemailer.createTransport({
				host: 'smtp.gmail.com',
				service: 'gmail',
				port: 456,
				secure: true,
				auth: {
					user: process.env.CORREO_USER,
					pass: process.env.CORREO_PASSWORD,
				},
			});
			// mensaje enviar
			const mailOptions = {
				from: process.env.CORREO_USER,
				to: `${user.email}`,
				subject: `Enlace para recuperar contraseña `,
				html: `
                    <h1>Restablecer Contraseña</h1>
                    <a href="${process.env.HOST_FRONT}/new-password/${user.id}/${token
					.split('.')
					.join('+')}">
                    ${process.env.HOST_FRONT}/new-password/${user.id}/${token
					.split('.')
					.join('+')}</a>
                `,
			};

			await transporter.sendMail(mailOptions);
			console.log('Se envió');
			return {
				statusCode: 201,
				status: true,
				message: ['El correo de recuperación de clave fue enviado'],
			};
		} catch (error) {
			console.log(error);
			return {
				statusCode: 500,
				status: false,
				message: ['Error en el servidor'],
			};
		}
	},

	async resetPassword(req, res) {
		const {clave} = req.body;
		const {id, token} = req.params;

		try {
			const user = await Persona.findOne({
				where: {
					id,
					tokenResetClave: token,
				},
			});

			if (!user) {
				return res.status(404).json({message: 'El token es invalido'});
			}

			// TODO: Verificamos que el token no haya expirado
			const userToken = jwt.verify(
				user.tokenResetClave,
				process.env.SECRET_KEY,
				async (err, payload) => {
					if (err) {
						console.log(err);
						await user.update({
							tokenResetClave: null,
						});
						return res
							.status(400)
							.json({message: 'El token expiro intente nuevamente'});
					}
				}
			);
			console.log('userToken', userToken);
			// TODO: haseamos clave
			const claveNueva = await bcrypt.hash(clave, 10);
			// TODO: actualizar la clave
			await user.update({
				clave: claveNueva,
				tokenResetClave: null,
			});

			res.status(200).json({message: 'La contraseña se actualizo con exito'});
		} catch (error) {
			console.log(error);
			res.status(500).json({message: 'Error en el servidor'});
		}
	},
};
