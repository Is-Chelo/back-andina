const {
	subject,
	program,
	teacher,
	people,
	matricula,
	student_grades,
	area,
	Sequelize,
	coordinador,
	area_coordinador,
} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');
const {subjectTransform} = require('./utils/subject-transform');
const programService = require('./ProgramService');
const teacherService = require('./TeacherService');
const {subjectTransformReporte} = require('./utils/reports/subject-transform-reporte');
const {Op} = require('sequelize');
module.exports = {
	async create(body) {
		const [programExiste, teacherExiste] = await Promise.all([
			programService.show(body.id_program),
			teacherService.show(body.id_teacher),
		]);

		if (!programExiste.status) return programExiste;
		if (!teacherExiste.status) return teacherExiste;

		try {
			const response = await subject.create(body);
			if (response) {
				const existMatriculas = await matricula.findAll({
					where: {
						id_program: body.id_program,
					},
					attributes: [
						[Sequelize.fn('DISTINCT', Sequelize.col('id_student')), 'id_student'],
						'id',
					],
					order: [['id_student', 'ASC']],
				});
				if (existMatriculas) {
					const dataGrades = Object.values(existMatriculas).map((matricula) => {
						return {
							id_student: matricula.id_student,
							id_subject: response.dataValues.id,
							id_matricula: matricula.id,
							id_program: Number(body.id_program),
							qualification: 0,
							qualified: false,
							average: 0,
							approved: false,
						};
					});
					await student_grades.bulkCreate(dataGrades);
				}
			}
			return {
				statusCode: 201,
				status: true,
				message: ['Asignatura Registrada'],
				data: response,
			};
		} catch (error) {
			console.log(error);
			if (error.parent.errno === 1062) {
				const regex = /'([^']*)'/;
				const resultado = error.parent.sqlMessage.match(regex)[1];
				return BadRequest(`Ya exite un valor con el nombre de ${resultado}`);
			}
			return InternalServer('Error en el servidor');
		}
	},

	async index(params, userAuth) {
		const {active} = params;
		try {
			let whereCoordinador = {};
			let where = {};
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
				response = await subject.findAll({
					where: where,
					include: [{model: program}, {model: teacher, include: [{model: people}]}],
				});
			} else {
				const areas = await area.findAll({
					include: [
						{
							model: area_coordinador,
							where: whereCoordinador,
						},
					],
				});
				const idsAreas = Object.values(areas).map((area) => area.id);

				const programas = await program.findAll({
					where: {
						id_area: {[Op.or]: idsAreas},
					},
				});
				const idsProgramas = Object.values(programas).map((programas) => programas.id);

				if (idsProgramas.length > 0) {
					response = await subject.findAll({
						where: {
							id_program: {
								[Op.or]: idsProgramas,
							},
						},
						include: [{model: program}, {model: teacher, include: [{model: people}]}],
					});
				} else {
					response = [];
				}
			}
			const dataTransform = Object.values(response).map((data, index) => {
				return subjectTransform(data.dataValues, index + 1);
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

	async reporte(params) {
		const {active} = params;
		try {
			let where = {};
			if (active !== undefined)
				if (active === 'true') where = {active: true};
				else where = {active: false};

			const response = await subject.findAll({
				where: where,
				include: [{model: program}, {model: teacher, include: [{model: people}]}],
			});

			const dataTransform = Object.values(response).map((data) => {
				return subjectTransformReporte(data.dataValues);
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
			const response = await subject.findOne({
				where: {
					id: id,
				},
				include: [{model: program}, {model: teacher, include: [{model: people}]}],
			});

			if (!response) {
				return NotFoundResponse(`Asingantura con el id: ${id} no existe. `);
			}
			const dataTransform = subjectTransform(response.dataValues);

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
		const [programExiste, teacherExiste] = await Promise.all([
			programService.show(body.id_program),
			teacherService.show(body.id_teacher),
		]);
		if (!programExiste.status) return programExiste;
		if (!teacherExiste.status) return teacherExiste;
		try {
			const response = await subject.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`Asignatura con el id: ${id} no existe.`);
			}

			await subject.update(body, {
				where: {
					id: id,
				},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['Registro actualizado.'],
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
			const response = await subject.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`La Asignatura con el id: ${id} que solicitas no existe `);
			}

			await subject.destroy({
				where: {id: id},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['El Registro eliminado correctamente.'],
				data: [],
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
