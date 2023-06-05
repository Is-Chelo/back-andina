const express = require('express');
const router = express.Router();

// Validates
const {check} = require('express-validator');
const {validateFields} = require('../../middlewares/validateFields');
const {validarToken, validarPermisos} = require('../../middlewares/auth');

const StudentGradeController = require('../../controllers/api/StudentGradesController');

// PARA CUALQUIER USUARIO QUE SEA ROL DISTINTO A DOCENTE O ESTUDIANTE
router.get('/programs-all', [validarToken, validarPermisos], StudentGradeController.programsAll);

router.get(
	'/subjects-by-program-other/:id_program',
	[validarToken, validarPermisos],
	StudentGradeController.gradesTeacherByProgramOtherUsers
);

// PARA  USUARIOS DOCENTE
router.get(
	'/programs-by-teacher',
	[validarToken, validarPermisos],
	StudentGradeController.programsByTeacher
);

router.get(
	'/by-student/:id_program',
	[validarToken, validarPermisos],
	StudentGradeController.gradesStudentByProgram
);
router.get(
	'/subjects-by-program/:id_program',
	[validarToken, validarPermisos],
	StudentGradeController.gradesTeacherByProgram
);
router.get(
	'/matriculas-by-program/:id_program',
	[validarToken, validarPermisos],
	StudentGradeController.matriculasByPrograms
);

router.get(
	'/students-by-subject',
	[validarToken, validarPermisos],
	StudentGradeController.gradesStudentsBySubject
);
router.get(
	'/students-by-subject-reporte',
	[validarToken, validarPermisos],
	StudentGradeController.gradesStudentsBySubjectReporte
);

// PARA TODOS LOS USUARIOS QUE TENGA PERMISO DE EDITAR
router.put(
	'/student-grade/:id',
	[
		validarToken,
		validarPermisos,
		check('qualification', 'La calificación es requerida.').trim().escape().not().isEmpty(),
		validateFields,
	],
	StudentGradeController.update
);
router.put(
	'/all-student-grade/',
	[
		validarToken,
		validarPermisos,
		// check('qualifications', 'La calificación es requerida.').trim().escape().not().isEmpty(),
		check('qualifications')
			.isArray()
			.withMessage('El campo calificaciones debe ser un arreglo'),
		validateFields,
	],
	StudentGradeController.updateAll
);

// PARA ESTUDIANTES
router.get(
	'/programs-by-student',
	[validarToken, validarPermisos],
	StudentGradeController.programsByStudent
);
router.get(
	'/matricula-by-student/:id_program',
	[validarToken, validarPermisos],
	StudentGradeController.matriculasByStudentByProgram
);

// ESTUDIANTES
router.get(
	'/grades-by-student-by-matricula',
	[validarToken, validarPermisos],
	StudentGradeController.gradesByStudentByMatricula
);
router.get(
	'/grades-by-student-by-matricula-reporte',
	[validarToken, validarPermisos],
	StudentGradeController.gradesByStudentByMatriculaReporte
);

module.exports = router;
