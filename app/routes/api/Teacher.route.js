const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');
const {validarToken, validarPermisos} = require('../../middlewares/auth');

const TeacherControllerController = require('../../controllers/api/TeacherController');

router.get('/', [validarToken, validarPermisos], TeacherControllerController.index);

router.get(
	'/teacher-with-contract',
	[validarToken, validarPermisos],
	TeacherControllerController.teacherWithContract
);

router.get('/reporte', [validarToken, validarPermisos], TeacherControllerController.reporteAll);

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
	TeacherControllerController.create
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
		check('address', 'La direccion es requerida.').trim().escape().not().isEmpty(),
		check('cellphone', 'El número de celular es requerido.').trim().escape().not().isEmpty(),
		check('academics_hours', 'Las horas académicas es son Requidas.')
			.trim()
			.escape()
			.not()
			.isEmpty(),
	],
	TeacherControllerController.update
);

router.get('/:id', [validarToken, validarPermisos], TeacherControllerController.show);
router.delete('/:id', [validarToken, validarPermisos], TeacherControllerController.delete);

module.exports = router;
