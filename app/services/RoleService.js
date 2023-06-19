const { Op } = require('sequelize');
const {role, rolmodule, modulo} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');
const {roleTransformReport} = require('./utils/reports/role-transform-report');
const {roleTransform, roleModuleTransform} = require('./utils/role-transform');

module.exports = {
	async create(body) {
		try {
			const response = await role.create(body);
			if (response) {
				const modules = await modulo.findOne({
					where: {
						url: '/api/v1/role-module',
					},
				});
				await rolmodule.create({
					id_module: modules.id,
					id_rol: response.dataValues.id,
					ok_select: 1,
				});
			}
			return {
				statusCode: 201,
				status: true,
				message: ['Rol Registrado'],
				data: response,
			};
		} catch (error) {
			if (error.parent.errno === 1062) {
				const regex = /'([^']*)'/; // Expresión regular para extraer la subcadena entre comillas simples
				const resultado = error.parent.sqlMessage.match(regex)[1];
				return BadRequest(`Ya exite un valor con el nombre de ${resultado}`);
			}
			return InternalServer('Error en el servidor');
		}
	},

	async index() {
		try {
			const response = await role.findAll({
			});
			const dataTransform = Object.values(response).map((data, index) => {
				return roleTransform(data.dataValues, index + 1);
			});
			return {
				statusCode: 200,
				status: true,
				message: ['Operacion Exitosa'],
				data: dataTransform,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},


	async listOnlyOtherRoles() {
		try {
			const response = await role.findAll({
				where: {
					id: {
						[Op.not]: [2, 3, 4],
					},
				},
			});
			const dataTransform = Object.values(response).map((data, index) => {
				return roleTransform(data.dataValues, index + 1);
			});
			return {
				statusCode: 200,
				status: true,
				message: ['Operacion Exitosa'],
				data: dataTransform,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},


	async reporte() {
		try {
			const response = await role.findAll({});
			const dataTransform = Object.values(response).map((data) => {
				return roleTransformReport(data.dataValues);
			});
			return {
				statusCode: 200,
				status: true,
				message: ['Operacion Exitosa'],
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
			let where = {};
			if (isNaN(id)) where = {uuid: id};
			else where = {id: id};

			const response = await role.findOne({
				where,
				include: [
					{
						model: rolmodule,
						include: [{model: modulo}],
					},
				],
			});
			if (!response) {
				return NotFoundResponse(`Role con el id: ${id} no existe. `);
			}
			// TODO: Transformamos los datos de roleModule
			const dataRolePermissionTransform = response.dataValues.rolmodules.map((rolPer) => {
				return roleModuleTransform(rolPer);
			});

			// TODO: este modulo tiene que ir si o si en todos los modulos solo el listar porque es el que valida que permisos tiene
			const filterModuleRole = dataRolePermissionTransform
				.map((rolPer) => {
					if (rolPer.module_url !== '/api/v1/role-module') return rolPer;
					return null;
				})
				.filter((data) => data !== null);

			// TODO: transformamos los datos del Rol Como tal
			response.dataValues.rolmodules = filterModuleRole;
			const dataTransform = roleTransform(response.dataValues);
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

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await role.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`Role con el id: ${id} no existe.`);
			}

			await role.update(body, {
				where: {
					id: id,
				},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['Registro actualizado'],
				data: [],
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para eliminar un item
	async delete(id) {
		try {
			const response = await role.findOne({
				where: {
					id: id,
				},
			});
			if (!response) {
				return NotFoundResponse(`La Role con el id: ${id} que solicitas no existe `);
			}

			await role.destroy({
				where: {id: id},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['El Registro se elimino'],
				data: [],
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
