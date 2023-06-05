const express = require('express');
const router = express.Router();

const {validarToken, validarPermisos} = require('../../middlewares/auth');

const ModuleControllerController = require('../../controllers/api/ModuleController');

router.get('/', [validarToken, validarPermisos], ModuleControllerController.index);
router.get('/reporte', [validarToken, validarPermisos], ModuleControllerController.reporteAll);


router.get(
	'/modules-by-rol/:id',
	[validarToken, validarPermisos],
	ModuleControllerController.getModulesByRole
);
router.get('/:id', [validarToken, validarPermisos], ModuleControllerController.show);

module.exports = router;
