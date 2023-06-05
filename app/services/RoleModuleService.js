const {rolmodule} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');
const rolService = require('./RoleService');
module.exports = {
	async create(body) {
		const rol = await rolService.show(body.id_rol);
		body.id_rol = rol.data.id;
		try {
			const response = await rolmodule.create(body);
			return {
				statusCode: 201,
				status: true,
				message: ['El permiso para el rol se agrego correctamente.'],
				data: response,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		const rol = await rolService.show(body.id_rol);
		body.id_rol = rol.data.id;
		try {
			const response = await rolmodule.findOne({
				where: {id: id},
			});

			if (!response) {
				return NotFoundResponse(`La registro que desea actualizar no existe.`);
			}

			await rolmodule.update(body, {
				where: {id: id},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['Registro actualizado correctamente.'],
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
			const response = await rolmodule.findOne({
				where: {
					id: id,
				},
			});
			if (!response) {
				return NotFoundResponse(`La registro que desea eliminar no existe.`);
			}

			await rolmodule.destroy({
				where: {id: id},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['El registro se eliminó correctamente'],
				data: [],
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	// * funcion para listar un item
	async show(id) {
		try {
			const response = await rolmodule.findOne({
				where: {id: id},
			});

			if (!response) {
				return NotFoundResponse(`El item con el id: ${id} no existe. `);
			}
			return {
				statusCode: 200,
				status: true,
				message: ['Operacion exitosa.'],
				data: response,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * verificamos que permisos tiene el rol que me llega para mostrar o ocultar campos
	async getPermissionByModule(id, id_rol) {
		try {
			const response = await rolmodule.findOne({
				where: {id_module: id, id_rol},
			});
			if (!response) {
				return NotFoundResponse(`El item con el id: ${id} no existe. `);
			}
			return {
				statusCode: 200,
				status: true,
				message: ['Operacion exitosa.'],
				data: response,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
