const {teacher_contracts, teacher, people} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');
const {teacherContractsTransform} = require('./utils/teacher-contract-transform');
const teacherService = require('./TeacherService');
const moment = require('moment');

module.exports = {
	async create(body) {
		try {
			// const teacherExiste =
			const teacherResponse = await teacherService.show(body.teacher_id);
			if (!teacherResponse.status) return teacherResponse;

			const contractTeacherResponse = await this.validIfTeacherHaveContractActive(
				body.teacher_id
			);

			if (!contractTeacherResponse.status)
				return {
					statusCode: 404,
					status: false,
					message: contractTeacherResponse.message,
					data: [],
				};

			const dateInit = moment(body.date_init).format('YYYY-MM-DD');
			const dateEnd = moment(body.date_end).format('YYYY-MM-DD');
			if (dateInit > dateEnd) {
				return {
					statusCode: 404,
					status: false,
					message: ['La fecha de inicio no puede ser mayor a la fecha de finalización.'],
					data: [],
				};
			}

			const response = await teacher_contracts.create(body);

			return {
				statusCode: 201,
				status: true,
				message: ['Contrato creado correctamente.'],
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
			response = await teacher_contracts.findAll({
				include: [{model: teacher, include: [{model: people}]}],
			});

			const dataTransform = Object.values(response).map((data, index) => {
				return teacherContractsTransform(data.dataValues, index + 1);
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
			const response = await teacher_contracts.findOne({
				where: {id: id},
				include: [{model: teacher, include: [{model: people}]}],
			});

			if (!response) {
				return NotFoundResponse(`Contrato con el id: ${id} no existe. `);
			}

			const dataTransform = teacherContractsTransform(response.dataValues);

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

	// * funcion para listar un item
	async validIfTeacherHaveContractActive(teacherId) {
		try {
			const response = await teacher_contracts.findOne({
				where: {teacher_id: teacherId, active: true},
			});

			if (!response) {
				return {
					statusCode: 200,
					status: true,
					message: ['El docente no tiene contrato.'],
					data: response,
				};
			} else {
				if (response.active === true) {
					return {
						statusCode: 200,
						status: false,
						message: ['El docente ya tiene un contrato activo.'],
						data: response,
					};
				} else {
					return {
						statusCode: 200,
						status: true,
						message: ['El docente esta siendo recontratado.'],
						data: response,
					};
				}
			}
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// * funcion para actualizar los datos de un item
	async update(id, body) {
		try {
			const response = await teacher.findOne({
				where: {id: body.teacher_id},
			});

			if (!response) {
				return NotFoundResponse(`Teacher con el id: ${id} no existe.`);
			}

			await teacher_contracts.update(body, {
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
			const response = await teacher_contracts.findOne({
				where: {id: id},
			});

			if (!response) {
				return NotFoundResponse(`El contrato con el id: ${id} que solicitas no existe `);
			}

			await teacher_contracts.destroy({
				where: {id: id},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['El registro se eliminó correctamente.'],
				data: [],
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
