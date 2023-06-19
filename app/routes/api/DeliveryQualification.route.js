const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const DeliveryQualification = require('../../controllers/api/DeliveryQualificationController');
const {validarToken, validarPermisos} = require('../../middlewares/auth');

router.get('/', [validarToken, validarPermisos], DeliveryQualification.index);
router.get('/reporte', [validarToken, validarPermisos], DeliveryQualification.reporte);
router.post(
	'/',
	[
		validarToken,
		validarPermisos,
		check('start_time', 'El start_time es Requerido').trim().escape().not().isEmpty(),
		check('close_time', 'El close_time es Requerido').trim().escape().not().isEmpty(),
		validateFields,
	],
	DeliveryQualification.create
);
router.put(
	'/:id',
	[
		validarToken,
		validarPermisos,
		check('start_time', 'El start_time es Requerido').trim().escape().not().isEmpty(),
		check('close_time', 'El close_time es Requerido').trim().escape().not().isEmpty(),
		validateFields,
	],
	DeliveryQualification.update
);

router.get('/active', [validarToken, validarPermisos], DeliveryQualification.active);

router.get('/:id', [validarToken, validarPermisos], DeliveryQualification.show);
router.delete('/:id', [validarToken, validarPermisos], DeliveryQualification.delete);

module.exports = router;
