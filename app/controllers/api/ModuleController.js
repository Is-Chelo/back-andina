const ModuleService = require('../../services/ModuleService');
const pdfService = require('../../services/PdfKitService');

module.exports = {
	async index(req, res) {
		const response = await ModuleService.index();
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await ModuleService.show(id);
		res.status(response.statusCode).json(response);
	},
	async getModulesByRole(req, res) {
		const {id} = req.params; // id del Rol
		const response = await ModuleService.moduleByRole(id);
		res.status(response.statusCode).json(response);
	},
	async reporteAll(req, res) {
		const {query} = req;
		const response = await ModuleService.index(query);
		return pdfService.crearPdf(res, response.data, 'Datos de los Módulos del Sistema');
	},
};
