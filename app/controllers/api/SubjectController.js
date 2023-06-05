const SubjectService = require('../../services/SubjectService');
const pdfService = require('../../services/PdfKitService');

module.exports = {
	async index(req, res) {
		const {query} = req;
		const userAuth = req.user;
		const response = await SubjectService.index(query, userAuth);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await SubjectService.show(id);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const {body} = req;
		const response = await SubjectService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await SubjectService.update(id, body);
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await SubjectService.delete(id);
		res.status(response.statusCode).json(response);
	},

	async reporteAll(req, res) {
		const {query} = req;
		// const userAuth = req.user;
		const response = await SubjectService.reporte(query);
		return pdfService.crearPdf(res, response.data, 'Datos de las Asignaturas');
	},
};
