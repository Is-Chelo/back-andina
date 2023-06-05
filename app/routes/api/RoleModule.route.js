const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');
const {validarToken, validarPermisos} = require('../../middlewares/auth');

const RoleModuleController = require('../../controllers/api/RoleModuleControler');

router.post(
	'/',
	[
		validarToken,
		validarPermisos,
		check('id_module', 'El módulo es requerido').trim().escape().not().isEmpty(),
		check('id_rol', 'El rol es requerido').trim().escape().not().isEmpty(),
		check('ok_select', 'El campo listar es requerido').trim().escape().not().isEmpty(),
		check('ok_update', 'El campo actualizar es requerido').trim().escape().not().isEmpty(),
		check('ok_delete', 'El campo eliminar es requerido').trim().escape().not().isEmpty(),
		check('ok_insert', 'El campo guardar es requerido').trim().escape().not().isEmpty(),
		validateFields,
	],
	RoleModuleController.create
);
router.put(
	'/:id',
	[
		validarToken,
		validarPermisos,
		check('id_module', 'El módulo es requerido').trim().escape().not().isEmpty(),
		check('id_rol', 'El rol es requerido').trim().escape().not().isEmpty(),
		check('ok_select', 'El campo listar es requerido').trim().escape().not().isEmpty(),
		check('ok_update', 'El campo actualizar es requerido').trim().escape().not().isEmpty(),
		check('ok_delete', 'El campo eliminar es requerido').trim().escape().not().isEmpty(),
		check('ok_insert', 'El campo guardar es requerido').trim().escape().not().isEmpty(),
		validateFields,
	],
	RoleModuleController.update
);
router.get('/valid-permission/:id', [validarToken, validarPermisos], RoleModuleController.getPermissionByModule);
router.get('/:id', [validarToken, validarPermisos], RoleModuleController.show);
router.delete('/:id', [validarToken, validarPermisos], RoleModuleController.delete);

module.exports = router;
