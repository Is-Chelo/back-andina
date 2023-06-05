const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');
const {validarToken, validarPermisos} = require('../../middlewares/auth');

const StudentControllerController = require('../../controllers/api/StudentController');
router.get('/', [validarToken], StudentControllerController.index);

router.get('/student-by-program/:id', StudentControllerController.studentsByProgram);
router.get('/student-by-subject/:id', StudentControllerController.studentsBySubject);
router.get('/programs-by-student/:id', StudentControllerController.programsByStudent);
router.get('/programs-by-user/:id', StudentControllerController.programsByStudentWhenIsUser);

router.get('/reporte', [validarToken, validarPermisos], StudentControllerController.reporteAll);

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
	StudentControllerController.create
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
		check('date_birth', 'La fecha de nacimiento es de tipo date.').trim().isDate(),
		check('cellphone', 'El número de celular es requerido.').trim().escape().not().isEmpty(),
		validateFields,
	],
	StudentControllerController.update
);

router.get('/student-by-program-report/:id', StudentControllerController.studentsByProgramReport);
router.get('/student-by-subject-report/:id', StudentControllerController.studentsBySubjectReport);
router.get('/programs-by-student-report/:id', StudentControllerController.programsByStudentReport);

router.get('/:id', [validarToken, validarPermisos], StudentControllerController.show);
router.delete('/:id', [validarToken, validarPermisos], StudentControllerController.delete);

module.exports = router;
