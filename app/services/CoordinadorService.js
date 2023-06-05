const {coordinador, people, role} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');
const {coordinadorTransform} = require('./utils/coordinador-transform');
const AuthService = require('./AuthServices');
const {v4: uuid} = require('uuid');
const { coordinadorReportTransform } = require('./utils/reports/coordinador-transform-report');
module.exports = {
	async create(body) {
		body.rol = 3;
		body.password = body.cellphone;

		const peopleResponse = await AuthService.register(body);
		if (peopleResponse.status === false) {
			return peopleResponse;
		}

		const createCoordinadorData = {
			type_rol: 'Coordinador',
			uuid: uuid(),
			active: body.active,
			id_people: peopleResponse.data.id,
		};

		try {
			const response = await coordinador.create(createCoordinadorData);
			return {
				statusCode: 201,
				status: true,
				message: ['Coordinador Registrado.'],
				data: response,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index() {
		try {
			const response = await coordinador.findAll({
				include: [
					{
						model: people,
						include: [{model: role}],
					},
				],
			});
			const dataTransform = Object.values(response).map((data, index) => {
				return coordinadorTransform(data.dataValues, index+1);
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
			const response = await coordinador.findAll({
				include: [
					{
						model: people,
						include: [{model: role}],
					},
				],
			});
			const dataTransform = Object.values(response).map((data) => {
				return coordinadorReportTransform(data.dataValues);
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
			const response = await coordinador.findOne({
				where: {
					id: id,
				},
				include: [
					{
						model: people,
						include: [{model: role}],
					},
				],
			});

			if (!response) {
				return NotFoundResponse(`Coordinador con el id: ${id} no existe. `);
			}
			const dataTransform = coordinadorTransform(response.dataValues);

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
		delete body.id;
		try {
			const response = await coordinador.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`Coordinador con el id: ${id} no existe.`);
			}
			const peopleResponse = await AuthService.update(response.id_people, body);
			if (peopleResponse.status === false) {
				return peopleResponse;
			}

			const updateCoordinadorData = {
				active: body.active,
			};
			await coordinador.update(updateCoordinadorData, {
				where: {
					id: id,
				},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['Coordinador actualizado'],
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
			const response = await coordinador.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`La Coordinador con el id: ${id} que solicitas no existe `);
			}

			await people.destroy({
				where: {id: response.dataValues.id_people},
			});

			await coordinador.destroy({
				where: {id: id},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['El Registro se eliminó'],
				data: [],
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
