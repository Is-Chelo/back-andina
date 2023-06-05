const ProgramService = require('../../services/ProgramService');
const pdfService = require('../../services/PdfKitService');

module.exports = {
	async index(req, res) {
		const userAuth = req.user;
		const response = await ProgramService.index(userAuth);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await ProgramService.show(id);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const {body} = req;
		const response = await ProgramService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await ProgramService.update(id, body);
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await ProgramService.delete(id);
		res.status(response.statusCode).json(response);
	},
	async reporteAll(req, res) {
		const userAuth = req.user;
		console.log(userAuth);
		const response = await ProgramService.reporte(userAuth);
		return pdfService.crearPdf(res, response.data, 'Datos de los Programas');
	},

	async indexDash(req, res) {
		const userAuth = req.user;
		const response = await ProgramService.dashBoard(userAuth);
		res.status(response.statusCode).json(response);
	},
};
