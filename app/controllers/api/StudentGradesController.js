const StudentGradesService = require('../../services/StudentGradesService');
const pdfService = require('../../services/PdfKitService');

module.exports = {
	async gradesStudentByProgram(req, res) {
		const {id_program} = req.params;
		const userAuth = req.user;
		const {query} = req;
		const response = await StudentGradesService.gradesStudentByProgram(
			query,
			id_program,
			userAuth
		);
		res.status(response.statusCode).json(response);
	},
	async gradesTeacherByProgram(req, res) {
		const {id_program} = req.params;
		const userAuth = req.user;
		const {query} = req;
		const response = await StudentGradesService.gradesTeacherByProgram(
			query,
			id_program,
			userAuth
		);
		res.status(response.statusCode).json(response);
	},

	async matriculasByPrograms(req, res) {
		const {id_program} = req.params;
		const userAuth = req.user;
		const {query} = req;
		const response = await StudentGradesService.matriculasByPrograms(
			query,
			id_program,
			userAuth
		);
		res.status(response.statusCode).json(response);
	},

	async gradesTeacherByProgramOtherUsers(req, res) {
		const {id_program} = req.params;
		const userAuth = req.user;
		const {query} = req;
		const response = await StudentGradesService.gradesTeacherByProgramOtherUsers(
			query,
			id_program,
			userAuth
		);
		res.status(response.statusCode).json(response);
	},
	async gradesStudentsBySubject(req, res) {
		const userAuth = req.user;
		const {query} = req;
		const response = await StudentGradesService.gradesStudentsBySubject(query, userAuth);
		res.status(response.statusCode).json(response);
	},

	async gradesStudentsBySubjectReporte(req, res) {
		const userAuth = req.user;
		const {query} = req;
		const response = await StudentGradesService.gradesStudentsBySubjectReporte(query, userAuth);
		return pdfService.crearPdf(
			res,
			response.data.grades,
			`Asignatura: ${response.data.nameTitle}`
		);
		// res.status(response.statusCode).json(response);
	},

	async programsByTeacher(req, res) {
		const userAuth = req.user;
		const {query} = req;
		const response = await StudentGradesService.programsByTeacher(query, userAuth);
		res.status(response.statusCode).json(response);
	},
	async programsAll(req, res) {
		const userAuth = req.user;
		const {query} = req;
		const response = await StudentGradesService.programasAll(query, userAuth);
		res.status(response.statusCode).json(response);
	},

	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await StudentGradesService.update(id, body);
		res.status(response.statusCode).json(response);
	},
	async updateAll(req, res) {
		const {body} = req;
		const response = await StudentGradesService.updateAllGrades(body);
		res.status(response.statusCode).json(response);
	},

	// ESTUDIANTE
	async programsByStudent(req, res) {
		const userAuth = req.user;
		const {query} = req;
		const response = await StudentGradesService.programsByStudent(query, userAuth);
		res.status(response.statusCode).json(response);
	},
	// ESTUDIANTE
	async matriculasByStudentByProgram(req, res) {
		const {id_program} = req.params;
		const userAuth = req.user;
		const {query} = req;
		const response = await StudentGradesService.matriculasByStudentByProgram(
			query,
			id_program,
			userAuth
		);
		res.status(response.statusCode).json(response);
	},
	// ESTUDIANTE
	async gradesByStudentByMatricula(req, res) {
		const userAuth = req.user;
		const {query} = req;
		const response = await StudentGradesService.gradesByStudentByMatricula(query, userAuth);
		res.status(response.statusCode).json(response);
	},

	async gradesByStudentByMatriculaReporte(req, res) {
		const userAuth = req.user;
		const {query} = req;
		const response = await StudentGradesService.gradesByStudentByMatriculaReporte(
			query,
			userAuth
		);
		return pdfService.crearPdf(
			res,
			response.data.grades,
			'Calificaciones',
			'grades',
			response.data.dataStudent,
			response.data.dataStudent.program_name
		);
	},
};
