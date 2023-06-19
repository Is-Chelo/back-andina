const DeliveryQualificationService = require('../../services/DeliveryQualificationService');
const pdfService = require('../../services/PdfKitService');

module.exports = {
	async index(req, res) {
		const response = await DeliveryQualificationService.index();
		res.status(response.statusCode).json(response);
	},
	async reporte(req, res) {
		const response = await DeliveryQualificationService.reporteAll();
		return pdfService.crearPdf(res, response.data, 'Fechas de Apertura Entrega de notas');
	},
	async active(req, res) {
		const response = await DeliveryQualificationService.active();
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await DeliveryQualificationService.show(id);
		res.status(response.statusCode).json(response);
	},

	async create(req, res) {
		const {body} = req;
		const response = await DeliveryQualificationService.create(body);
		res.status(response.statusCode).json(response);
	},

	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await DeliveryQualificationService.update(id, body);
		res.status(response.statusCode).json(response);
	},

	async delete(req, res) {
		const {id} = req.params;
		const response = await DeliveryQualificationService.delete(id);
		res.status(response.statusCode).json(response);
	},
};
