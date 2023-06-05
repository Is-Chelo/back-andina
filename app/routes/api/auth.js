const express = require('express');
const {check} = require('express-validator');

const router = express.Router();
const authController = require('../../controllers/AuthController');
const {validateFields} = require('../../middlewares/validateFields');
const {validarToken, validarPermisos} = require('../../middlewares/auth');
router.get('/', [validarToken, validarPermisos], authController.index);
router.get('/reporte', [validarToken, validarPermisos], authController.reporteAll);

router.post(
	'/signUp',
	[
		check('name', 'El name es Requerido').trim().escape().not().isEmpty(),
		check('email', 'El email es Requerido').trim().escape().not().isEmpty(),
		check('email', 'El email debe tener un formato correcto').trim().escape().isEmail(),
		check('username', 'El username es requerido').trim().escape().not().isEmpty(),
		check('password', 'La password es requerida').trim().escape().not().isEmpty(),
		check('password', 'La password debe ser mayor a 6 caracteres').isLength({
			min: 6,
		}),
		check('last_name', 'El apellido es requerido.').trim().escape().not().isEmpty(),
		check('date_birth', 'La fecha de nacimiento es requerido.').trim().escape().not().isEmpty(),
		check('date_birth', 'La fecha de nacimiento es requerido.').trim().isDate(),
		check('cellphone', 'El número de celular es requerido.').trim().escape().not().isEmpty(),
		check('rol', 'El rol es requerido.').not().isEmpty(),

		validateFields,
	],
	authController.register
);
router.post(
	'/recover-password',
	[
		check('email', 'El email es Requerido').trim().escape().not().isEmpty(),
		check('email', 'El email debe tener un formato correcto').trim().escape().isEmail(),
		validateFields,
	],
	authController.sendEmail
);
router.post(
	'/reset-password',
	[
		check('password', 'La password es requerida').trim().escape().not().isEmpty(),
		check('password', 'La password debe ser mayor a 6 caracteres').isLength({
			min: 6,
		}),
		validateFields,
	],
	authController.resetPassword
);

router.put(
	'/:id',
	[
		validarToken,
		validarPermisos,
		check('name', 'El name es Requerido').trim().escape().not().isEmpty(),
		check('email', 'El email es Requerido').trim().escape().not().isEmpty(),
		check('email', 'El email debe tener un formato correcto').trim().escape().isEmail(),
		check('username', 'El username es requerido').trim().escape().not().isEmpty(),
		check('password', 'La password es requerida').trim().escape().not().isEmpty(),
		check('password', 'La password debe ser mayor a 6 caracteres').isLength({
			min: 6,
		}),
		check('last_name', 'El apellido es requerido.').trim().escape().not().isEmpty(),
		check('date_birth', 'La fecha de nacimiento es requerido.').trim().escape().not().isEmpty(),
		check('date_birth', 'La fecha de nacimiento es requerido.').trim().isDate(),
		check('cellphone', 'El número de celular es requerido.').trim().escape().not().isEmpty(),
		check('rol', 'El rol es requerido.').not().isEmpty(),
	],
	authController.update
);

router.get('/:id', [validarToken, validarPermisos], authController.show);
router.delete('/:id', [validarToken, validarPermisos], authController.delete);

router.post(
	'/login',
	[
		check('username', 'El username es requerido').trim().escape().not().isEmpty(),
		check('password', 'La password es requerida').trim().escape().not().isEmpty(),
		check('password', 'La password debe ser mayor a 6 caracteres').isLength({
			min: 6,
		}),
		validateFields,
	],
	authController.login
);

module.exports = router;
