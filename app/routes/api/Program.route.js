const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');
const {validarToken, validarPermisos} = require('../../middlewares/auth');

const ProgramControllerController = require('../../controllers/api/ProgramController');
router.get('/', [validarToken, validarPermisos], ProgramControllerController.index);
router.get('/program-dash', ProgramControllerController.indexDash);
router.get('/reporte', [validarToken, validarPermisos], ProgramControllerController.reporteAll);
router.post(
	'/',
	[
		validarToken,
		validarPermisos,
		check('name', 'El nombre es requerido').trim().escape().not().isEmpty(),
		check('date_init', 'La fecha de inicio es requerido.').trim().isDate(),
		check('date_end', 'La fecha de finilización es requerido.').trim().isDate(),
		check('id_area', 'El area tiene que ser un número.').isInt(),
		check('id_area', 'El area es requerido.').trim().not().isEmpty(),
		validateFields,
	],
	ProgramControllerController.create
);
router.put(
	'/:id',
	[
		validarToken,
		validarPermisos,
		check('name', 'El nombre es requerido').trim().escape().not().isEmpty(),
		check('date_init', 'La fecha de inicio es requerido.').trim().isDate(),
		check('date_end', 'La fecha de finilización es requerido.').trim().isDate(),
		check('id_area', 'El area tiene que ser un número.').isInt(),
		check('id_area', 'El area es requerido.').trim().not().isEmpty(),
		validateFields,
	],
	ProgramControllerController.update
);
router.get('/:id', [validarToken, validarPermisos], ProgramControllerController.show);
router.delete('/:id', [validarToken, validarPermisos], ProgramControllerController.delete);

module.exports = router;
