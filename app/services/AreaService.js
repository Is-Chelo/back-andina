const {area, area_coordinador, coordinador, people, role} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');
const {areaTransform} = require('./utils/area-transform');
const {coordinadorTransform} = require('./utils/coordinador-transform');

module.exports = {
	async create(body) {
		try {
			const response = await area.create(body);
			if (response) {
				const areaCoordinadoresPromises = body.id_coordinadors.map((coordinadorId) => {
					return area_coordinador.create({
						id_area: response.id,
						id_coordinador: coordinadorId,
					});
				});
				await Promise.all(areaCoordinadoresPromises);
			}
			return {
				statusCode: 201,
				status: true,
				message: ['Area Registrada'],
				data: response,
			};
		} catch (error) {
			console.log(error);

			if (error.parent?.errno === 1062) {
				const regex = /'([^']*)'/; // Expresión regular para extraer la subcadena entre comillas simples
				const resultado = error.parent.sqlMessage.match(regex)[1];
				return BadRequest(`Ya exite un valor con el nombre de ${resultado}`);
			}
			return InternalServer('Error en el servidor');
		}
	},

	async index(params, userAuth) {
		const {active} = params;
		try {
			let where = {};
			let whereCoordinador = {};
			if (active !== undefined)
				if (active === 'true') where = {active: true};
				else where = {active: false};
			// ROL COODINADOR
			if (userAuth.rol === 3) {
				const idCoodinador = await coordinador.findOne({
					where: {
						id_people: userAuth.id,
					},
				});
				if (idCoodinador) whereCoordinador = {id_coordinador: idCoodinador.id};
			}
			let response;
			if (userAuth.rol !== 3) {
				response = await area.findAll({
					where: where,
					include: [
						{
							model: area_coordinador,
							include: [
								{
									model: coordinador,
									include: [{model: people, include: [{model: role}]}],
								},
							],
						},
					],
				});
			} else {
				response = await area.findAll({
					where: where,
					include: [
						{
							model: area_coordinador,
							include: [
								{
									model: coordinador,
									include: [{model: people, include: [{model: role}]}],
								},
							],
							where: whereCoordinador,
						},
					],
				});
			}

			const dataTransform = Object.values(response).map((data, index) => {
				return areaTransform(data.dataValues, index + 1);
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
			const response = await area.findOne({
				where: {
					id: id,
				},
				include: [
					{
						model: area_coordinador,
						include: [
							{
								model: coordinador,
								include: [{model: people, include: [{model: role}]}],
							},
						],
					},
				],
			});

			if (!response) {
				return NotFoundResponse(`Area con el id: ${id} no existe. `);
			}
			const dataTransform = areaTransform(response.dataValues);

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
			const response = await area.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`Area con el id: ${id} no existe.`);
			}

			await area.update(body, {
				where: {
					id: id,
				},
			});

			await area_coordinador.destroy({
				where: {id_area: id},
			});

			if (response) {
				const areaCoordinadoresPromises = body.id_coordinadors.map((coordinadorId) => {
					return area_coordinador.create({
						id_area: id,
						id_coordinador: coordinadorId,
					});
				});
				await Promise.all(areaCoordinadoresPromises);
			}

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
			const response = await area.findOne({
				where: {id: id},
			});

			if (!response) {
				return NotFoundResponse(`La Area con el id: ${id} que solicitas no existe `);
			}

			await area.destroy({
				where: {id: id},
			});

			await area_coordinador.destroy({
				where: {id_area: id},
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

	async showCoodinadorsByCoodinador(id) {
		try {
			const response = await area_coordinador.findAll({
				where: {
					id_area: id,
				},
				include: [
					{
						model: coordinador,
						include: [
							{
								model: people,
								include: [{model: role}],
							},
						],
					},
				],
			});

			if (!response) {
				return NotFoundResponse(`Area con el id: ${id} no existe. `);
			}
			const dataTransform = Object.values(response).map((data, index) => {
				return coordinadorTransform(data.dataValues.coordinador, index + 1);
			});

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
};
