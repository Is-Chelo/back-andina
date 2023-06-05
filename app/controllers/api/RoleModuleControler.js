const RoleModuleService = require('../../services/RoleModuleService');

module.exports = {
	async create(req, res) {
		const {body} = req;
		const response = await RoleModuleService.create(body);
		res.status(response.statusCode).json(response);
	},
	async update(req, res) {
		const {id} = req.params;
		const {body} = req;
		const response = await RoleModuleService.update(id, body);
		res.status(response.statusCode).json(response);
	},
	async delete(req, res) {
		const {id} = req.params;
		const response = await RoleModuleService.delete(id);
		res.status(response.statusCode).json(response);
	},
	async show(req, res) {
		const {id} = req.params;
		const response = await RoleModuleService.show(id);
		res.status(response.statusCode).json(response);
	},

	async getPermissionByModule(req, res) {
		
		const rol = req.rol;
		const {id} = req.params;
		const response = await RoleModuleService.getPermissionByModule(id, rol);
		res.status(response.statusCode).json(response);
	},
};
