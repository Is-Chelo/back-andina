const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');
const {validarToken, validarPermisos} = require('../../middlewares/auth');

const CoordinadorControllerController = require('../../controllers/api/CoordinadorController');
router.get('/', [validarToken, validarPermisos], CoordinadorControllerController.index);
router.get('/reporte',[validarToken, validarPermisos], CoordinadorControllerController.reporteAll);

router.post(
	'/',
	[
		validarToken,
		validarPermisos,
		check('name', 'El name es Requerido').trim().escape().not().isEmpty(),
		check('email', 'El email es Requerido').trim().escape().not().isEmpty().toLowerCase(),
		check('email', 'El email debe tener un formato correcto')
			.trim()
			.escape()
			.isEmail()
			.toLowerCase(),
		check('username', 'El username es requerido').trim().escape().not().isEmpty(),
		check('last_name', 'El apellido es requerido.').trim().escape().not().isEmpty(),
		check('date_birth', 'La fecha de nacimiento es requerido.').trim().escape().not().isEmpty(),
		check('date_birth', 'La fecha de nacimiento es requerido.').trim().isDate(),
		check('cellphone', 'El número de celular es requerido.').trim().escape().not().isEmpty(),
		validateFields,
	],
	CoordinadorControllerController.create
);
router.put(
	'/:id',
	[
		validarToken,
		validarPermisos,
		check('name', 'El name es Requerido').trim().escape().not().isEmpty(),
		check('email', 'El email es Requerido').trim().escape().not().isEmpty().toLowerCase(),
		check('email', 'El email debe tener un formato correcto')
			.trim()
			.escape()
			.isEmail()
			.toLowerCase(),
		check('username', 'El username es requerido').trim().escape().not().isEmpty(),
		check('last_name', 'El apellido es requerido.').trim().escape().not().isEmpty(),
		check('date_birth', 'La fecha de nacimiento es requerido.').trim().escape().not().isEmpty(),
		check('date_birth', 'La fecha de nacimiento es requerido.').trim().isDate(),
		check('cellphone', 'El número de celular es requerido.').trim().escape().not().isEmpty(),
	],
	CoordinadorControllerController.update
);

router.get('/:id', [validarToken, validarPermisos], CoordinadorControllerController.show);
router.delete('/:id', [validarToken, validarPermisos], CoordinadorControllerController.delete);

module.exports = router;
