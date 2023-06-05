const {modulo, rolmodule} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');
const {moduleTransform} = require('./utils/module-transform');
const roleService = require('./RoleService');
const {Op} = require('sequelize');
module.exports = {
	async index() {
		try {
			const response = await modulo.findAll({
				where: {
					url: {
						[Op.not]: '/api/v1/role-module',
					},
				},
			});
			const dataTransform = Object.values(response).map((data, index) => {
				return moduleTransform(data.dataValues, index+1);
			});
			return {
				statusCode: 200,
				status: true,
				message: ['Operación Exitosa'],
				data: dataTransform,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para listar un item
	async show(id) {
		try {
			const response = await modulo.findOne({
				where: {
					id: id,
					url: {
						[Op.not]: '/api/v1/role-module',
					},
				},
			});
			if (!response) return NotFoundResponse(`Modulo con el id: ${id} no existe.`);
			const dataTransform = moduleTransform(response.dataValues);
			return {
				statusCode: 200,
				status: true,
				message: ['Operacion exitosa.'],
				data: dataTransform,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// JUST MODULE BY ROLE
	async moduleByRole(id) {
		try {
			const rol = await roleService.show(id);
			const [allModule, modulesByRol] = await Promise.all([
				this.index(),
				roleService.show(rol.data.id),
			]);
			const missingModulesByRol = this.dataFilter(allModule.data, modulesByRol.data);
			return {
				statusCode: 200,
				status: true,
				message: ['Operación Exitosa'],
				data: missingModulesByRol,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	dataFilter(dataModules, dataRolModule) {
		const dataMissingModule = dataModules.map((data) => {
			const existeModule = dataRolModule.roleModule.some((elem) => {
				return elem.module_name === data.name;
			});
			return existeModule ? null : data;
		});
		return dataMissingModule.filter((data) => data !== null);
	},
};
