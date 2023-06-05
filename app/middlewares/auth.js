const jwt = require('jsonwebtoken');
const {modulo, rolmodule} = require('../models/index');

// * middleware para verificar el token introducido
const validarToken = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({
			status: false,
			mesagge: ['No tiene autorizacion envie un token'],
		});
	}

	try {
		const token = req.headers.authorization.split(' ');
		const userToken = jwt.verify(token[1], process.env.SECRET_KEY);
		if (userToken) {
			// * Guardamos el rol en la request
			req.rol = userToken.rol;
			req.user = userToken;
			next();
		}
	} catch (e) {
		res.status(401).json({
			status: false,
			message: ['Token no valido'],
		});
		console.log(e);
	}
};

// * middleware para verificar los permisos del usuario
const validarPermisos = async (req, res, next) => {
	// * verficamos si se paso antes por el middleware de verificacion del token y recuperamos el rol
	if (!req.rol) return res.status(500).json({status: false, message: ['Token no validado']});
	const idRol = req.rol;

	// * verificamos si la url existe en nuestra base de datos
	const urlModule = await modulo.findOne({where: {url: req.baseUrl}});

	if (urlModule === null)
		return res.status(404).json({
			status: false,
			message: ['Esta modulo y ruta no existe en la base de datos'],
		});

	const idModule = urlModule.id;

	// *  Verificamos si el rol tiene los permisos de acceder a dicho Module

	const usuarioPermitido = await rolmodule.findOne({
		where: {
			id_module: idModule,
			id_rol: idRol,
		},
	});

	if (usuarioPermitido) {
		switch (req.method) {
			case 'GET':
				if (usuarioPermitido.ok_select) next();
				else
					return res.status(403).json({
						status: false,
						message: ['No tiene permisos para ver el listado de esta sección'],
					});
				break;
			case 'POST':
				if (usuarioPermitido.ok_insert) next();
				else
					return res.status(401).json({
						status: false,
						message: ['No tiene permisos para crear ningun registro en esta sección'],
					});
				break;
			case 'PUT':
				if (usuarioPermitido.ok_update) next();
				else
					return res.status(401).json({
						status: false,
						message: ['No tiene permisos para actualizar en esta sección'],
					});
				break;
			case 'DELETE':
				if (usuarioPermitido.ok_delete) next();
				else
					return res.status(401).json({
						status: false,
						message: ['No tiene permisos para eliminar en esta sección'],
					});
				break;
			case 'PATCH':
				if (usuarioPermitido.ok_update) next();
				else
					return res.status(401).json({
						status: false,
						message: ['No tiene permisos para actualizar en esta sección'],
					});
				break;
		}
	} else {
		return res.status(404).json({
			status: false,
			message: ['El usuario no tiene permisos'],
		});
	}
};
module.exports = {
	validarToken,
	validarPermisos,
};
