const StudentService = require('../../services/StudentService');
const pdfService = require('../../services/PdfKitService');

module.exports = {
	async index(req, res) {
		const response = await StudentService.index();
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await StudentService.show(id);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const {body} = req;
		const response = await StudentService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await StudentService.update(id, body);
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await StudentService.delete(id);
		res.status(response.statusCode).json(response);
	},

	async reporteAll(req, res) {
		const {query} = req;
		const response = await StudentService.reporte(query);
		return pdfService.crearPdf(res, response.data, 'Datos de los Estudiantes');
	},

	async studentsByProgram(req, res) {
		const {id} = req.params;
		const response = await StudentService.studentsByProgram(id);
		res.status(response.statusCode).json(response);
	},

	async studentsByProgramReport(req, res) {
		const {id} = req.params;
		const response = await StudentService.studentsByProgramReport(id);
		return pdfService.crearPdf(res, response.data, 'Datos de los Estudiantes por programa');
	},

	async studentsBySubject(req, res) {
		const {id} = req.params;
		const response = await StudentService.studentsBySubject(id);
		res.status(response.statusCode).json(response);
	},
	async studentsBySubjectReport(req, res) {
		const {id} = req.params;
		const response = await StudentService.studentsBySubjectReport(id);
		return pdfService.crearPdf(res, response.data, 'Datos de los Estudiantes por asignatura');
	},
	async programsByStudent(req, res) {
		const {id} = req.params;
		const response = await StudentService.programsByStudent(id);
		res.status(response.statusCode).json(response);
	},
	

	async programsByStudentReport(req, res) {
		const {id} = req.params;
		const response = await StudentService.programsByStudent(id);
		return pdfService.crearPdf(res, response.data, 'Estudiantes de un programa');
	},


	async programsByStudentWhenIsUser(req, res) {
		const {id} = req.params;
		const response = await StudentService.programsByStudentWhenIsUser(id);
		res.status(response.statusCode).json(response);
	},
};
