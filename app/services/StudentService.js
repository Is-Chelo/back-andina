const {student, people, role, program, matricula, subject} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');
const {studentTransform} = require('./utils/student-transform');
const AuthService = require('./AuthServices');
const {v4: uuid} = require('uuid');
const {studentTransformReporte} = require('./utils/reports/student-transform-reporte');
const {Op} = require('sequelize');
module.exports = {
	async create(body) {
		body.rol = 4;
		body.password = body.cellphone;

		const peopleResponse = await AuthService.register(body);
		if (peopleResponse.status === false) {
			return peopleResponse;
		}

		const createStudentData = {
			type_rol: 'Estudiante',
			uuid: uuid(),
			active: body.active,
			id_people: peopleResponse.data.id,
		};

		try {
			const response = await student.create(createStudentData);
			return {
				statusCode: 201,
				status: true,
				message: ['Estudiante Registrado.'],
				data: response,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async index() {
		try {
			const response = await student.findAll({
				include: [
					{
						model: people,
						include: [{model: role}],
					},
				],
			});
			const dataTransform = Object.values(response).map((data, index) => {
				return studentTransform(data.dataValues, index + 1);
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
			const response = await student.findAll({
				include: [
					{
						model: people,
						include: [{model: role}],
					},
				],
			});
			const dataTransform = Object.values(response).map((data) => {
				return studentTransformReporte(data.dataValues);
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
			const response = await student.findOne({
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
				return NotFoundResponse(`Estudiante con el id: ${id} no existe. `);
			}
			const dataTransform = studentTransform(response.dataValues);

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
			const response = await student.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`Estudiante con el id: ${id} no existe.`);
			}
			const peopleResponse = await AuthService.update(response.id_people, body);
			if (peopleResponse.status === false) {
				return peopleResponse;
			}

			const updateStudentData = {
				active: body.active,
			};

			await student.update(updateStudentData, {
				where: {
					id: id,
				},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['Estudiante actualizado'],
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
			const response = await student.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`La Student con el id: ${id} que solicitas no existe `);
			}

			await people.destroy({
				where: {id: response.dataValues.id_people},
			});

			await student.destroy({
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

	async findByCiNumber(ciNumber) {
		try {
			const studentExist = await student.findOne({
				include: [
					{
						model: people,
						include: [{model: role}],
						where: {
							ci_number: ciNumber, // aqui seria ol que llega
						},
					},
				],
			});
			if (!studentExist) {
				return NotFoundResponse(
					`Estudiante con el documento de identidad: ${ciNumber} no existe. `
				);
			}
			const dataTransform = studentTransform(studentExist.dataValues);

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

	async studentsByProgram(idProgram) {
		try {
			const students = await matricula.findAll({
				include: [{model: student, include: [{model: people, include: [{model: role}]}]}],
				where: {id_program: idProgram},
				attributes: ['id_student'],
				group: ['id_student'],
			});

			if (students.length === 0) {
				return {
					statusCode: 200,
					status: true,
					message: ['Operacion exitosa.'],
					data: [],
				};
			}
			const dataTransform = Object.values(students).map((data, index) => {
				return studentTransform(data.dataValues.student, index + 1);
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

	async studentsByProgramReport(idProgram) {
		try {
			const students = await matricula.findAll({
				include: [{model: student, include: [{model: people, include: [{model: role}]}]}],
				where: {id_program: idProgram},
				attributes: ['id_student'],
				group: ['id_student'],
			});

			if (students.length === 0) {
				return {
					statusCode: 200,
					status: true,
					message: ['Operacion exitosa.'],
					data: [],
				};
			}
			const dataTransform = Object.values(students).map((data, index) => {
				return studentTransformReporte(data.dataValues.student, index + 1);
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

	async studentsBySubject(idSubject) {
		try {
			const subjects = await subject.findAll({
				where: {id: idSubject},
				include: [
					{
						model: program,
					},
				],
			});

			const idPrograms = Object.values(subjects).map((subject) => subject.program.id);
			const matriculados = await matricula.findAll({
				where: {
					id_program: {
						[Op.or]: idPrograms,
					},
				},
				include: [{model: student, include: [{model: people, include: [{model: role}]}]}],
				attributes: ['id_student'],
				group: ['id_student'],
			});

			if (matriculados.length === 0) {
				return {
					statusCode: 200,
					status: true,
					message: ['Operacion no hay.'],
					data: [],
				};
			}
			const dataTransform = Object.values(matriculados).map((data, index) => {
				return studentTransform(data.dataValues.student, index + 1);
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

	async studentsBySubjectReport(idSubject) {
		try {
			const subjects = await subject.findAll({
				where: {id: idSubject},
				include: [
					{
						model: program,
					},
				],
			});

			const idPrograms = Object.values(subjects).map((subject) => subject.program.id);
			const matriculados = await matricula.findAll({
				where: {
					id_program: {
						[Op.or]: idPrograms,
					},
				},
				include: [{model: student, include: [{model: people, include: [{model: role}]}]}],
				attributes: ['id_student'],
				group: ['id_student'],
			});

			if (matriculados.length === 0) {
				return {
					statusCode: 200,
					status: true,
					message: ['Operacion no hay.'],
					data: [],
				};
			}
			const dataTransform = Object.values(matriculados).map((data, index) => {
				return studentTransformReporte(data.dataValues.student, index + 1);
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

	async programsByStudent(idStudent) {
		try {
			const programs = await matricula.findAll({
				where: {id_student: idStudent},
				include: [
					{
						model: program,
					},
				],
				attributes: ['id_program'],
				group: ['id_program'],
			});

			if (programs.length === 0) {
				return {
					statusCode: 200,
					status: true,
					message: ['No hay registros.'],
					data: [],
				};
			}

			const dataTransform = Object.values(programs).map((data, index) => {
				return {
					id: index + 1,
					program_name: data.program.name,
					program_version: data.program.version,
					date_init: data.program.date_init,
					date_end: data.program.date_end,
					sede: data.program.sede === 'sucre' ? 'Sucre' : 'La Paz',
				};
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

	async programsByStudentWhenIsUser(idUser) {
		try {
			const studentExiste = await student.findOne({
				where: {
					id_people: idUser,
				},
			});
			const programs = await matricula.findAll({
				where: {id_student: studentExiste.id},
				include: [
					{
						model: program,
					},
				],
				attributes: ['id_program'],
				group: ['id_program'],
			});

			if (programs.length === 0) {
				return {
					statusCode: 200,
					status: true,
					message: ['No hay registros.'],
					data: [],
				};
			}

			const dataTransform = Object.values(programs).map((data, index) => {
				return {
					id: index + 1,
					program_name: data.program.name,
					program_version: data.program.version,
					date_init: data.program.date_init,
					date_end: data.program.date_end,
					sede: data.program.sede === 'sucre' ? 'Sucre' : 'La Paz',
				};
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
