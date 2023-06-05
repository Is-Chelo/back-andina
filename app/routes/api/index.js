const express = require('express');
const router = express.Router();
const {validarToken, validarPermisos} = require('../../middlewares/auth');

router.use('/deploy', (req, res) => {
	let command = `npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`;
	console.log('command: ', command);

	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error al ejecutar el comando: ${error.message}`);
			res.json({
				status: false,
				message: error,
			});
		}
		if (stderr) {
			console.error(`Error de salida estándar del comando: ${stderr}`);
			res.json({
				status: true,
				message: 'Run Database',
			});
		}
	});
	res.json({
		status: true,
	});
});

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
