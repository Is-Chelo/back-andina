const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');
const {validarToken, validarPermisos} = require('../../middlewares/auth');

const RoleControllerController = require('../../controllers/api/RoleController');

router.get('/', [validarToken, validarPermisos], RoleControllerController.index);
router.get('/other', [validarToken, validarPermisos], RoleControllerController.listOnlyOtherRoles);
router.get('/reporte', [validarToken, validarPermisos], RoleControllerController.reporteAll);

router.post(
	'/',
	[
		validarToken,
		validarPermisos,
		check('name', 'El name es Requerido').trim().escape().not().isEmpty(),
		validateFields,
	],
	RoleControllerController.create
);
router.put(
	'/:id',
	[
		validarToken,
		validarPermisos,
		check('name', 'El name es Requerido').trim().escape().not().isEmpty(),
		validateFields,
	],
	RoleControllerController.update
);
router.get('/:id', [validarToken, validarPermisos], RoleControllerController.show);
router.delete('/:id', [validarToken, validarPermisos], RoleControllerController.delete);

module.exports = router;
