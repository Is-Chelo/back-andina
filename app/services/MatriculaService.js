const {
	matricula,
	program,
	student,
	student_grades,
	Subject,
	people,
	coordinador,
	area,
	area_coordinador,
} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');
const programService = require('./ProgramService');
const studentService = require('./StudentService');
const studenGrade = require('./StudentGradesService');
const moment = require('moment');
const {matriculaTransform} = require('./utils/matricula-transform');
const {matriculaTransformReport} = require('./utils/reports/matricula-transform-report');
const {Op} = require('sequelize');

module.exports = {
	async create(body) {
		try {
			const [programExiste, studentExiste] = await Promise.all([
				programService.show(body.id_program),
				studentService.show(body.id_student),
			]);

			if (!programExiste.status) return programExiste;
			if (!studentExiste.status) return studentExiste;
			const now = moment();

			const matriculaBystudentExist = await matricula.findOne({
				where: {
					id_student: body.id_student,
					id_program: body.id_program,
				},
				include: [{model: program}, {model: student_grades}],
				order: [['id', 'DESC']],
			});
			let numOrder = 1;
			if (matriculaBystudentExist !== null) {
				numOrder += matriculaBystudentExist.order;
				let validIfSubjecApproved = [];
				let validWasQualifed = [];
				Object.values(matriculaBystudentExist.student_grades).forEach((dato) => {
					validIfSubjecApproved.push(dato.approved);
					validWasQualifed.push(dato.qualified);
				});

				if (!validIfSubjecApproved.includes(false))
					return BadRequest(
						'El estudiante no puede matricularse a este programa porque ya venció todas las asignaturas.'
					);

				if (!!validWasQualifed.includes(false))
					return BadRequest(
						'El estudiante no puede matricularse a este programa porque tiene una o mas asignaturas sin calificar.'
					);
				if (matriculaBystudentExist.Program.active === false) {
					return BadRequest('El programa al que desea matricular se encuentra cerrado.');
				}
			}

			const response = await matricula.create({
				...body,
				active: true,
				order: numOrder,
				gestion: now.format('YYYY'),
			});

			if (!response)
				return {
					statusCode: 400,
					status: false,
					message: ['Surgio un error al registrar la matricula.'],
				};

			// TODO: creamos todas las materias correspondientes a un Estudiante.
			const subjects = await programService.showSubjectsByProgram(body.id_program);

			const studenteGradesBulk = [];
			for (let i = 0; i < subjects.data.length; i++) {
				const approvedSubject = await student_grades.findOne({
					where: {
						id_subject: subjects.data[i].subject_id,
						approved: true,
						id_student: body.id_student,
					},
				});

				if (approvedSubject === null) {
					studenteGradesBulk.push({
						id_student: body.id_student,
						id_subject: subjects.data[i].subject_id,
						id_matricula: response.id,
						id_program: body.id_program,
						order: 1,
						qualification: 0,
						average: 0,
						approved: false,
					});
				}
			}
			await studenGrade.createBulk(studenteGradesBulk);
			return {
				statusCode: 201,
				status: true,
				message: ['Matricula Registrada'],
				// data: response,
			};
		} catch (error) {
			console.log('aqui esta el error', error);
			return InternalServer('Error en el servidor');
		}
	},

	async index(userAuth) {
		try {
			let whereCoordinador = {};
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
				response = await matricula.findAll({
					include: [{model: program}, {model: student, include: [{model: people}]}],
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

				response = await matricula.findAll({
					include: [
						{
							model: program,
							include: [
								{
									model: area,
									where: {
										id: {
											[Op.or]: idsAreas,
										},
									},
								},
							],
						},
						{model: student, include: [{model: people}]},
					],
				});
			}
			const dataTransform = [];
			Object.values(response).forEach((data, index) => {
				if (data.dataValues.program?.dataValues.name !== undefined) {
					const dT = matriculaTransform(data.dataValues, index + 1);
					dataTransform.push(dT);
				}
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

	async reporte(userAuth) {
		try {
			let whereCoordinador = {};
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
				response = await matricula.findAll({
					include: [{model: program}, {model: student, include: [{model: people}]}],
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

				response = await matricula.findAll({
					include: [
						{
							model: program,
							include: [
								{
									model: area,
									where: {
										id: {
											[Op.or]: idsAreas,
										},
									},
								},
							],
						},
						{model: student, include: [{model: people}]},
					],
				});
			}
			const dataTransform = [];
			Object.values(response).forEach((data, index) => {
				if (data.dataValues.program?.dataValues.name !== undefined) {
					const dT = matriculaTransformReport(data.dataValues, index + 1);
					dataTransform.push(dT);
				}
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
			const response = await matricula.findOne({
				where: {
					id: id,
				},
				include: [{model: program}, {model: student, include: [{model: people}]}],
			});

			if (!response) {
				return NotFoundResponse(`Matricula con el id: ${id} no existe. `);
			}

			const dataTransform = matriculaTransform(response.dataValues);
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
		const [programExiste, studentExiste] = await Promise.all([
			programService.show(body.id_program),
			studentService.show(body.id_student),
		]);

		if (!programExiste.status) return programExiste;
		if (!studentExiste.status) return studentExiste;
		try {
			const response = await matricula.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`Matricula con el id: ${id} no existe.`);
			}

			await matricula.update(body, {
				where: {
					id: id,
				},
			});

			// TODO: creamos todas las materias correspondientes a un Studiante.
			const subjects = await programService.showSubjectsByProgram(body.id_program);

			const studenteGradesBulk = [];
			for (let i = 0; i < subjects.data.length; i++) {
				const approvedSubject = await student_grades.findOne({
					where: {
						id_subject: subjects.data[i].subject_id,
						approved: true,
					},
				});
				if (approvedSubject === null) {
					studenteGradesBulk.push({
						id_student: body.id_student,
						id_subject: subjects.data[i].subject_id,
						id_matricula: response.id,
						id_program: body.id_program,
						order: 1,
						qualification: 0,
						average: 0,
						approved: false,
					});
				}
			}

			await studenGrade.deleteByOnlyMatricula(id);
			await studenGrade.createBulk(studenteGradesBulk);

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
			const response = await matricula.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`La Matricula con el id: ${id} que solicitas no existe `);
			}

			await matricula.destroy({
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
