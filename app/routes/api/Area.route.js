const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');

const AreaControllerController = require('../../controllers/api/AreaController');
const {validarToken, validarPermisos} = require('../../middlewares/auth');

router.get('/', [validarToken, validarPermisos], AreaControllerController.index);
router.get('/reporte', [validarToken, validarPermisos], AreaControllerController.reporteAll);
router.post(
	'/',
	[
		validarToken,
		validarPermisos,
		check('name', 'El name es Requerido').trim().escape().not().isEmpty(),
		check('id_coordinadors', 'Debe enviar al menos un coordinador.').not().isEmpty(),
		validateFields,
	],
	AreaControllerController.create
);
router.put(
	'/:id',
	[
		validarToken,
		validarPermisos,
		check('name', 'El name es Requerido').trim().escape().not().isEmpty(),
		validateFields,
	],
	AreaControllerController.update
);
router.get('/coodinadors/:id', [validarToken, validarPermisos], AreaControllerController.showCoodinadorsByCoodinador);
router.get('/:id', [validarToken, validarPermisos], AreaControllerController.show);
router.delete('/:id', [validarToken, validarPermisos], AreaControllerController.delete);

module.exports = router;
