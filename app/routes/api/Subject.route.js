const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const SubjectController = require('../../controllers/api/SubjectController');
const {validarToken, validarPermisos} = require('../../middlewares/auth');

router.get('/', [validarToken, validarPermisos], SubjectController.index);
router.get('/reporte', [validarToken, validarPermisos], SubjectController.reporteAll);

router.post(
	'/',
	[
		validarToken,
		validarPermisos,
		check('name', 'El name es Requerido').trim().escape().not().isEmpty(),
		check('id_program', 'El Programa es Requerido').trim().escape().not().isEmpty(),
		check('id_teacher', 'El Docente es Requerido').trim().escape().not().isEmpty(),
		check('academics_hours', 'Las horas académicas es son Requidas.')
			.trim()
			.escape()
			.not()
			.isEmpty(),
		check('academics_hours', 'Las horas académicas es de tipo Numero.').isDecimal(),
		validateFields,
	],
	SubjectController.create
);
router.put(
	'/:id',
	[
		validarToken,
		validarPermisos,
		check('name', 'El name es Requerido').trim().escape().not().isEmpty(),
		check('id_program', 'El Programa es Requerido').trim().escape().not().isEmpty(),
		check('id_teacher', 'El Docente es Requerido').trim().escape().not().isEmpty(),
		check('academics_hours', 'Las horas académicas es son Requidas.')
			.trim()
			.escape()
			.not()
			.isEmpty(),
		check('academics_hours', 'Las horas académicas es de tipo Numero.').isDecimal(),
		validateFields,
	],
	SubjectController.update
);
router.get('/:id', [validarToken, validarPermisos], SubjectController.show);
router.delete('/:id', [validarToken, validarPermisos], SubjectController.delete);

module.exports = router;
