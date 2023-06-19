const {Op} = require('sequelize');
const {delivery_of_qualifications} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');
const { deliveryGradesTransform } = require('./utils/reports/delivery-grades-transform-report');

module.exports = {
	async create(body) {
		try {
			await delivery_of_qualifications.update({active: false}, {where: {id: {[Op.gt]: 1}}});

			const response = await delivery_of_qualifications.create({...body, active: true});
			return {
				statusCode: 201,
				status: true,
				message: ['Fecha de Entraga de notas registrado'],
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

	async index() {
		try {
			const response = await delivery_of_qualifications.findAll({});
			return {
				statusCode: 200,
				status: true,
				message: ['Operacion Exitosa'],
				data: response,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	async reporteAll() {
		try {
			const response = await delivery_of_qualifications.findAll({});
			const dataTransform = Object.values(response).map((data, index) => {
				return deliveryGradesTransform(data.dataValues, index + 1);
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
			const response = await delivery_of_qualifications.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`El registro con el id: ${id} no existe. `);
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
	// * funcion para listar un item
	async active() {
		try {
			const response = await delivery_of_qualifications.findOne({
				where: {
					active: true,
				},
			});

			if (!response) {
				return NotFoundResponse(`El registro con el id: ${id} no existe. `);
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

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await delivery_of_qualifications.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`Area con el id: ${id} no existe.`);
			}

			await delivery_of_qualifications.update(body, {
				where: {
					id: id,
				},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['Fecha de entrega de notas actualizado'],
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
			const response = await delivery_of_qualifications.findOne({
				where: {id: id},
			});

			if (!response) {
				return NotFoundResponse(`El registro con el id: ${id} que solicitas no existe `);
			}

			await delivery_of_qualifications.destroy({
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
