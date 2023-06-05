const express = require('express');
const router = express.Router();
const {validarToken, validarPermisos} = require('../../middlewares/auth');

// * AUTH
router.use('/auth', require('./auth'));

// * Routes Add With generate
router.use('/area', require('./Area.route'));
router.use('/subject', require('./Subject.route'));
router.use('/program', require('./Program.route'));
router.use('/student', require('./Student.route'));
router.use('/coordinador', require('./Coordinador.route'));
router.use('/teacher', require('./Teacher.route'));
router.use('/matricula', require('./Matricula.route'));
router.use('/grades-student', require('./StudentGrades.route'));
router.use('/kardex', require('./Kardex.route'));

// ROLES and PERMISSIONS
router.use('/role', require('./Role.route'));
router.use('/module', require('./Module.route'));
router.use('/role-module', require('./RoleModule.route'));

module.exports = router;
