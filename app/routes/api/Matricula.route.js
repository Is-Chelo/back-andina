const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');
const {validarPermisos, validarToken} = require('../../middlewares/auth');

const MatriculaController = require('../../controllers/api/MatriculaController');

router.get('/', [validarToken, validarPermisos], MatriculaController.index);
router.get('/reporte', [validarToken, validarPermisos], MatriculaController.reporteAll);
router.post(
	'/',
	[
		validarToken,
		validarPermisos,
		check('id_program', 'El programa es Requerido').trim().escape().not().isEmpty(),
		check('id_student', 'El estudiante es Requerido').trim().escape().not().isEmpty(),
		validateFields,
	],
	MatriculaController.create
);
router.put(
	'/:id',
	[
		validarToken,
		validarPermisos,
		check('id_program', 'El programa es Requerido').trim().escape().not().isEmpty(),
		check('id_student', 'El estudiante es Requerido').trim().escape().not().isEmpty(),
		validateFields,
	],
	MatriculaController.update
);
router.get('/:id', [validarToken, validarPermisos], MatriculaController.show);
router.delete('/:id', [validarToken, validarPermisos], MatriculaController.delete);

module.exports = router;
