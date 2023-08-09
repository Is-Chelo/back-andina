const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const TeacherContractController = require('../../controllers/api/TeacherContractController');
const {validarToken, validarPermisos} = require('../../middlewares/auth');

router.get('/', [validarToken, validarPermisos], TeacherContractController.index);
router.get('/reporte', [validarToken, validarPermisos], TeacherContractController.reporteAll);

router.post(
	'/',
	[
		validarToken,
		validarPermisos,
		check('teacher_id', 'El Docente es Requerido').trim().escape().not().isEmpty(),
		check('date_init', 'La fecha de inicio es requerido.').trim().isDate(),
		check('date_end', 'La fecha de finilización es requerido.').trim().isDate(),
		check('contract_number', 'Debe enviar el número de contrato.').not().isEmpty(),
		validateFields,
	],
	TeacherContractController.create
);

router.put(
	'/:id',
	[
		validarToken,
		validarPermisos,
		check('teacher_id', 'El Docente es Requerido').trim().escape().not().isEmpty(),
		check('date_init', 'La fecha de inicio es requerida.').trim().isDate(),
		check('date_end', 'La fecha de finilización es requerida.').trim().isDate(),
		check('contract_number', 'Debe enviar el número de contrato.').not().isEmpty(),
		validateFields,
	],
	TeacherContractController.update
);

router.get('/:id', [validarToken, validarPermisos], TeacherContractController.show);
router.delete('/:id', [validarToken, validarPermisos], TeacherContractController.delete);

module.exports = router;
