const {teacher, people, role, teacher_contracts} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');
const AuthService = require('./AuthServices');
const {v4: uuid} = require('uuid');
const {teacherTransform} = require('./utils/teacher-transform');
const {teacherTransformReport} = require('./utils/reports/teacher-transform-report');
module.exports = {
	async create(body) {
		body.rol = 2;
		body.password = body.cellphone;

		const peopleResponse = await AuthService.register(body);
		if (peopleResponse.status === false) {
			return peopleResponse;
		}

		const createTeacherData = {
			type_rol: 'Docente',
			uuid: uuid(),
			academics_hours: body.academics_hours,
			active: body.active,
			id_people: peopleResponse.data.id,
		};

		try {
			const response = await teacher.create(createTeacherData);
			return {
				statusCode: 201,
				status: true,
				message: ['Docente Registrado.'],
				data: response,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index() {
		try {
			const response = await teacher.findAll({
				include: [
					{
						model: people,
						include: [{model: role}],
					},
				],
			});
			const dataTransform = Object.values(response).map((data, index) => {
				return teacherTransform(data.dataValues, index + 1);
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

	async teacherWithContract(params) {
		const {active} = params;
		let where = {};
		if (active !== undefined)
			if (active === 'true') where = {active: true};
			else where = {active: false};
		try {
			const response = await teacher.findAll({
				include: [
					{
						model: people,
						include: [{model: role}],
					},
				],
				where,
			});

			const dataTransform = await Promise.all(
				response.map(async (data, index) => {
					const teacherContract = await teacher_contracts.findOne({
						where: {
							teacher_id: data.dataValues.id,
							active: true,
						},
					});

					if (teacherContract) return teacherTransform(data.dataValues, index + 1);
					else return null;
				})
			);
			// Filtrar los elementos nulos
			const filteredData = dataTransform.filter((item) => item !== null);

			return {
				statusCode: 200,
				status: true,
				message: ['Operacion Exitosa'],
				data: filteredData,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async reporte() {
		try {
			const response = await teacher.findAll({
				include: [
					{
						model: people,
						include: [{model: role}],
					},
				],
			});
			const dataTransform = Object.values(response).map((data) => {
				return teacherTransformReport(data.dataValues);
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
			const response = await teacher.findOne({
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
				return NotFoundResponse(`Docente con el id: ${id} no existe. `);
			}

			const dataTransform = teacherTransform(response.dataValues);
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
			const response = await teacher.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`Docente con el id: ${id} no existe.`);
			}

			const peopleResponse = await AuthService.update(response.id_people, body);
			if (peopleResponse.status === false) {
				return peopleResponse;
			}

			const updateTeacherData = {
				academics_hours: body.academics_hours,
				active: body.active,
			};

			await teacher.update(updateTeacherData, {
				where: {
					id: id,
				},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['Docente actualizado.'],
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
			const response = await teacher.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`El Docente con el id: ${id} que solicitas no existe `);
			}
			await people.destroy({
				where: {id: response.dataValues.id_people},
			});

			await teacher_contracts.destroy({
				where: {teacher_id: id},
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
