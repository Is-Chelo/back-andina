const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');
const {validarToken, validarPermisos} = require('../../middlewares/auth');

const KardexController = require('../../controllers/api/KardexController');
router.get('/other/:idStudent', [validarToken, validarPermisos], KardexController.getByStudent);
router.get('/reporte/:idStudent', [validarToken, validarPermisos], KardexController.reportAll);

router.get(
	'/:idStudent/:idProgram',
	[validarToken, validarPermisos],
	KardexController.getByStudent
);

module.exports = router;
