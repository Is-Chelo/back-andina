const TeacherContractService = require('../../services/TeacherContractService');
const pdfService = require('../../services/PdfKitService');

module.exports = {
	async index(req, res) {
		// const userAuth = req.user;
		// const {query} = req;
		const response = await TeacherContractService.index();
		res.status(response.statusCode).json(response);
	},

	async show(req, res) {
		const {id} = req.params;
		const response = await TeacherContractService.show(id);
		res.status(response.statusCode).json(response);
	},

	async create(req, res) {
		const {body} = req;

		const response = await TeacherContractService.create(body);
		res.status(response.statusCode).json(response);
	},

	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await TeacherContractService.update(id, body);
		res.status(response.statusCode).json(response);
	},

	async delete(req, res) {
		const {id} = req.params;
		const response = await TeacherContractService.delete(id);
		res.status(response.statusCode).json(response);
	},

	async reporteAll(req, res) {
		// const userAuth = req.user;
		// const {query} = req;
		const response = await TeacherContractService.index();
		return pdfService.crearPdf(res, response.data, 'Reporte de contrataciones de Docentes');
	},
};
