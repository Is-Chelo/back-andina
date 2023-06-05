const AreaService = require('../../services/AreaService');
const pdfService = require('../../services/PdfKitService');

module.exports = {
	async index(req, res) {
		const userAuth = req.user;
		const {query} = req;
		const response = await AreaService.index(query, userAuth);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await AreaService.show(id);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const {body} = req;
		const response = await AreaService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await AreaService.update(id, body);
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await AreaService.delete(id);
		res.status(response.statusCode).json(response);
	},

	async reporteAll(req, res) {
		const userAuth = req.user;
		const {query} = req;
		const response = await AreaService.index(query, userAuth);
		return pdfService.crearPdf(res, response.data, 'Datos de la Tabla Area');
	},

	async showCoodinadorsByCoodinador(req, res) {
		const {id} = req.params;
		const response = await AreaService.showCoodinadorsByCoodinador(id);
		res.status(response.statusCode).json(response);
	},
};
