const MatriculaService = require('../../services/MatriculaService');
const pdfService = require('../../services/PdfKitService');

module.exports = {
	async index(req, res) {
		const userAuth = req.user;
		const response = await MatriculaService.index(userAuth);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const { id } = req.params
		const response = await MatriculaService.show(id);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const { body } = req
		const response = await MatriculaService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const { id } = req.params
		const { body } = req
		const response = await MatriculaService.update( id, body );
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const { id } = req.params
		const response = await MatriculaService.delete( id );
		res.status(response.statusCode).json(response);
	},

	async reporteAll(req, res) {
		const userAuth = req.user;
		const response = await MatriculaService.reporte(userAuth);
		return pdfService.crearPdf(res, response.data, 'Datos de los Matriculados');
	},

};
