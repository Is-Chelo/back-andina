const RoleService = require('../../services/RoleService');
const pdfService = require('../../services/PdfKitService');

module.exports = {
	async index(req, res) {
		const response = await RoleService.index();
		res.status(response.statusCode).json(response);
	},
	async listOnlyOtherRoles(req, res) {
		const response = await RoleService.listOnlyOtherRoles();
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await RoleService.show(id);
		res.status(response.statusCode).json(response);
	},
	async create(req, res) {
		const {body} = req;
		const response = await RoleService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await RoleService.update(id, body);
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await RoleService.delete(id);
		res.status(response.statusCode).json(response);
	},

	async reporteAll(req, res) {
		const {query} = req;
		const response = await RoleService.reporte(query);
		return pdfService.crearPdf(res, response.data, 'Datos de los Roles');
	},
};
