const TeacherService = require('../../services/TeacherService');
const pdfService = require('../../services/PdfKitService');

module.exports = {
	async index(req, res) {
		const response = await TeacherService.index();
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await TeacherService.show(id);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const {body} = req;
		const response = await TeacherService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await TeacherService.update(id, body);
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await TeacherService.delete(id);
		res.status(response.statusCode).json(response);
	},
	async reporteAll(req, res) {
		const {query} = req;
		const response = await TeacherService.reporte(query);
		return pdfService.crearPdf(res, response.data, 'Datos de los Docentes');
	},
};
