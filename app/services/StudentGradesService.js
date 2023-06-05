const {
	student_grades,
	program,
	subject,
	student,
	teacher,
	people,
	matricula,
} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');
const {gradesTransform} = require('./utils/grades-by-students');
const {programsByTeacherTransform} = require('./utils/programs-by-teacher-transform');
const {subjectsByProgramTransform} = require('./utils/subjects-by-program-transform');

const programService = require('../services/ProgramService');
const {matriculaByStudentTransform} = require('./utils/matricula-by-student-transform');
const {gradesTransformReporte} = require('./utils/reports/grades-by-students-report');
module.exports = {
	async create(body) {
		try {
			const response = await student_grades.create(body);
			if (!response)
				return {
					statusCode: 400,
					status: false,
					message: ['Surgio un error al registrar la matricula.'],
				};

			return {
				statusCode: 201,
				status: true,
				message: ['Matricula Registrada'],
				data: response,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async createBulk(body) {
		try {
			const response = await student_grades.bulkCreate(body);
			if (!response)
				return {
					statusCode: 400,
					status: false,
					message: ['Surgio un error al registrar la matricula.'],
				};

			return {
				statusCode: 201,
				status: true,
				message: ['Matricula Registrada'],
				data: response,
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async deleteByMatricula(id) {
		try {
			const response = await student_grades.findOne({
				where: {
					id_matricula: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`No se encontró la matricula`);
			}

			await people.destroy({
				where: {id_matricula: id},
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

	async deleteByOnlyMatricula(id) {
		try {
			const response = await student_grades.findOne({
				where: {
					id_matricula: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`No se encontró la matricula`);
			}
			await student_grades.destroy({
				where: {id_matricula: id},
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

	async gradesStudentByProgram(query, id_program, userAuth) {
		try {
			const idPeople = userAuth.id;
			let response;
			// estudiante
			if (userAuth.rol === 4) {
				const studentAuth = await student.findOne({
					where: {id_people: idPeople},
				});

				response = await student_grades.findAll({
					include: [{model: subject}],
					where: {
						id_program,
						id_student: studentAuth.id,
					},
				});
			} else {
				return {
					statusCode: 401,
					status: false,
					message: ['No tiene permisos para esta vista'],
				};
			}
			const programData = await program.findOne({
				where: {
					id: id_program,
				},
			});
			return {
				statusCode: 200,
				status: true,
				message: ['Operacion Exitosa'],
				data: {
					student_grades: response,
					program: programData,
				},
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async gradesTeacherByProgram(query, id_program, userAuth) {
		try {
			const idPeople = userAuth.id;
			let response;
			// docente
			if (userAuth.rol === 2) {
				const teacherAuth = await teacher.findOne({
					where: {id_people: idPeople},
				});

				response = await program.findOne({
					include: [
						{
							model: subject,
							where: {
								id_teacher: teacherAuth.id,
							},
						},
					],
					where: {
						id: id_program,
					},
				});
				response = Object.values(response.dataValues.subjects).map((data) => {
					return subjectsByProgramTransform(data);
				});
			} else {
				return {
					statusCode: 401,
					status: false,
					message: ['No tiene permisos para esta vista'],
				};
			}

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
	// Matriuclas By Programs
	async matriculasByPrograms(query, id_program, userAuth) {
		try {
			let response;
			// docente
			if (userAuth.rol !== 4) {
				response = await matricula.findAll({
					where: {
						id_program: id_program,
					},
				});
				response = Object.values(response).map((data) => {
					return {
						matricula_id: data.id,
						id_program: data.id_program,
						order: data.order,
						order: data.order,
						gestion: data.gestion,
						matricula_name: `${data.order}/${data.gestion}`,
					};
				});

				//

				const uniqueData = response.reduce((accumulator, current) => {
					if (!accumulator[current.matricula_name]) {
						accumulator[current.matricula_name] = current;
					}
					return accumulator;
				}, {});
				response = Object.values(uniqueData);
			} else {
				return {
					statusCode: 401,
					status: false,
					message: ['No tiene permisos para esta vista'],
				};
			}

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

	// OTHER USERS, BUT NOT STUDENTS ROL
	async gradesTeacherByProgramOtherUsers(query, id_program, userAuth) {
		try {
			const idPeople = userAuth.id;
			let response;
			// distinto de estudiante
			if (userAuth.rol !== 4) {
				response = await program.findOne({
					include: [
						{
							model: subject,
						},
					],
					where: {
						id: id_program,
					},
				});
				response = Object.values(response.dataValues.subjects).map((data) => {
					return subjectsByProgramTransform(data);
				});
			} else {
				return {
					statusCode: 401,
					status: false,
					message: ['No tiene permisos para esta vista'],
				};
			}

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

	// Student by Program and
	async gradesStudentsBySubject(query, userAuth) {
		try {
			const {id_matricula} = query;

			const matriculaNew = id_matricula.split('/');
			if (matriculaNew[0] === '0') matriculaNew.push('0');

			const idPeople = userAuth.id;
			let response;
			// docente
			response = await student_grades.findAll({
				where: {
					id_program: query.id_program,
					id_subject: query.id_subject,
				},
				include: [
					{model: student, include: [{model: people}]},
					{
						model: matricula,
						where: {
							order: matriculaNew[0],
							gestion: matriculaNew[1],
						},
					},
				],
			});

			response = Object.values(response).map((data) => {
				return gradesTransform(data);
			});

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

	async gradesStudentsBySubjectReporte(query, userAuth) {
		try {
			const {id_matricula} = query;

			const matriculaNew = id_matricula.split('/');
			if (matriculaNew[0] === '0') matriculaNew.push('0');

			const idPeople = userAuth.id;
			let response;
			// docente
			response = await student_grades.findAll({
				where: {
					id_program: query.id_program,
					id_subject: query.id_subject,
				},
				include: [
					{model: student, include: [{model: people}]},
					{
						model: matricula,
						where: {
							order: matriculaNew[0],
							gestion: matriculaNew[1],
						},
					},
					{model: subject},
				],
			});
			const nameTitle = `${response[0].subject.name} ${response[0].matricula.order}-${response[0].matricula.gestion}`;
			response = Object.values(response).map((data) => {
				return gradesTransformReporte(data);
			});

			return {
				statusCode: 200,
				status: true,
				message: ['Operacion Exitosa'],
				data: {
					grades: response,
					nameTitle,
				},
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	//
	async programsByTeacher(query, userAuth) {
		const {active} = query;
		let where2 = {};
		if (active !== undefined)
			if (active === 'true') where2 = {active: true};
			else where2 = {active: false};
		try {
			const idPeople = userAuth.id;
			let response;
			// docente
			if (userAuth.rol === 2) {
				const teacherAuth = await teacher.findOne({
					where: {id_people: idPeople},
				});
				response = await subject.findAll({
					where: {
						id_teacher: teacherAuth.id,
					},
					include: [{model: program, where: {...where2}}],
				});
				response = Object.values(response).map((data) => {
					return programsByTeacherTransform(data.dataValues);
				});

				const uniqueData = response.reduce((accumulator, current) => {
					if (!accumulator[current.program_id]) {
						accumulator[current.program_id] = current;
					}
					return accumulator;
				}, {});

				response = Object.values(uniqueData);
			} else {
				return {
					statusCode: 401,
					status: false,
					message: ['No tiene permisos para esta vista'],
				};
			}
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

	// Others users for example adminh coordinator, etc but not student
	async programasAll(query, userAuth) {
		try {
			if (userAuth.rol !== 4) {
				const programResponse = await programService.index(query);
				return {
					statusCode: 200,
					status: true,
					message: ['Operacion Exitosa'],
					data: programResponse.data,
				};
			} else {
				return {
					statusCode: 401,
					status: false,
					message: ['No tiene permisos para esta vista'],
				};
			}
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async update(id, body) {
		try {
			const response = await student_grades.findOne({
				where: {id: id},
			});
			if (!response) return NotFoundResponse(`La caficicación con el id: ${id} no existe.`);

			if (body.qualification >= 70) body.approved = true;
			else body.approved = false;

			body.average = body.qualification;
			body.qualified = true;
			await student_grades.update(body, {
				where: {id: id},
			});

			return {
				statusCode: 200,
				status: true,
				message: ['Caficicación registrada correctamente.'],
				data: [],
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	async updateAllGrades(body) {
		const {qualifications} = body;

		try {
			for (let i = 0; i < qualifications.length; i++) {
				if (qualifications[i].id === undefined)
					return {
						statusCode: 400,
						status: false,
						message: [`No existe el id del elemento ${qualifications[i].id}`],
					};
				if (qualifications[i].qualification === undefined)
					return {
						statusCode: 400,
						status: false,
						message: [`No existe la calificación del elemento ${qualifications[i].id}`],
					};

				const response = await this.update(qualifications[i].id, qualifications[i]);
				if (!response.status) return response;
			}
			return {
				statusCode: 200,
				status: true,
				message: ['Todas las calificaciones se guardaron correctamente.'],
				data: [],
			};
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// VISTA PARA ESTUDIANTES
	async programsByStudent(query, userAuth) {
		const {active} = query;
		let where2 = {};
		if (active !== undefined)
			if (active === 'true') where2 = {active: true};
			else where2 = {active: false};
		try {
			const idPeople = userAuth.id;
			let response;
			// estudiante
			if (userAuth.rol === 4) {
				const studentAuth = await student.findOne({
					where: {id_people: idPeople},
				});
				response = await matricula.findAll({
					where: {
						id_student: studentAuth.id,
						...where2,
					},
					include: [{model: program}],
				});

				response = Object.values(response).map((data) => {
					return matriculaByStudentTransform(data.dataValues);
				});

				const uniqueData = response.reduce((accumulator, current) => {
					if (!accumulator[current.program_id]) {
						accumulator[current.program_id] = current;
					}
					return accumulator;
				}, {});

				response = Object.values(uniqueData);

				return {
					statusCode: 200,
					status: true,
					message: ['No tiene permisos para esta vista'],
					data: response,
				};
			} else {
				return {
					statusCode: 401,
					status: false,
					message: ['No tiene permisos para esta vista'],
				};
			}
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	async matriculasByStudentByProgram(query, idProgram, userAuth) {
		const {active} = query;
		let where2 = {};
		if (active !== undefined)
			if (active === 'true') where2 = {active: true};
			else where2 = {active: false};
		try {
			const idPeople = userAuth.id;
			let response;
			// estudiante
			if (userAuth.rol === 4) {
				const studentAuth = await student.findOne({
					where: {id_people: idPeople},
				});
				response = await matricula.findAll({
					where: {
						id_student: studentAuth.id,
						id_program: idProgram,
						...where2,
					},
				});
				response = Object.values(response).map((data) => {
					return {
						matricula_id: data.dataValues.id,
						matricula_name: `${data.dataValues.order}/${data.dataValues.gestion}`,
						matricula_order: data.dataValues.order,
						matricula_gestion: data.dataValues.gestion,
					};
				});
				return {
					statusCode: 200,
					status: true,
					message: ['No tiene permisos para esta vista'],
					data: response,
				};
			} else {
				return {
					statusCode: 401,
					status: false,
					message: ['No tiene permisos para esta vista'],
				};
			}
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
	// GRADES BY STUDENT BY MATRICULA AND BY PROGRAM
	async gradesByStudentByMatricula(query, userAuth) {
		const {id_program, id_matricula} = query;
		if (id_program === undefined || id_matricula === undefined) {
			return {
				statusCode: 400,
				status: false,
				message: ['Debe mandar ambos parametros en la query id_program and id_matricula.'],
			};
		}
		try {
			const idPeople = userAuth.id;
			let response;
			let dataStudent;
			// estudiante
			if (userAuth.rol === 4) {
				const studentAuth = await student.findOne({
					where: {id_people: idPeople},
				});

				response = await student_grades.findAll({
					where: {
						id_program: query.id_program,
						id_matricula: query.id_matricula,
						id_student: studentAuth.id,
					},
					include: [
						{model: subject},
						{model: program},
						{model: matricula},
						{model: student, include: {model: people}},
					],
				});
				response = Object.values(response).map((data) => {
					dataStudent = {
						person_name: data.student.dataValues.person.name,
						person_last_name: data.student.dataValues.person.last_name,
						person_full_name: `${data.student.dataValues.person.name} ${data.student.dataValues.person.last_name}`,
						person_ci: data.student.dataValues.person.ci_number,
						program_name: data.program.name,
						matricula_name: `${data.matricula.order}/${data.matricula.gestion}`,
						matricula_fecha: `${data.matricula.createdAt}`,
					};
					return {
						id: data.id,
						qualification: data.qualification,
						approved: data.approved,
						subject_name: data.subject.name,
						subject_id: data.subject.id,
					};
				});
				return {
					statusCode: 200,
					status: true,
					message: ['No tiene permisos para esta vista'],
					data: {
						grades: response,
						dataStudent: dataStudent,
					},
				};
			} else {
				return {
					statusCode: 401,
					status: false,
					message: ['No tiene permisos para esta vista'],
				};
			}
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},

	// GRADES BY STUDENT BY MATRICULA AND BY PROGRAM   REPORT
	async gradesByStudentByMatriculaReporte(query, userAuth) {
		const {id_program, id_matricula} = query;
		if (id_program === undefined || id_matricula === undefined) {
			return {
				statusCode: 400,
				status: false,
				message: ['Debe mandar ambos parametros en la query id_program and id_matricula.'],
			};
		}
		try {
			const idPeople = userAuth.id;
			let response;
			let dataStudent;
			// estudiante
			if (userAuth.rol === 4) {
				const studentAuth = await student.findOne({
					where: {id_people: idPeople},
				});

				response = await student_grades.findAll({
					where: {
						id_program: query.id_program,
						id_matricula: query.id_matricula,
						id_student: studentAuth.id,
					},
					include: [
						{model: subject},
						{model: program},
						{model: matricula},
						{model: student, include: {model: people}},
					],
				});
				let nameProgram = '';
				response = Object.values(response).map((data) => {
					dataStudent = {
						person_name: data.student.dataValues.person.name,
						person_last_name: data.student.dataValues.person.last_name,
						person_full_name: `${data.student.dataValues.person.name} ${data.student.dataValues.person.last_name}`,
						person_ci: data.student.dataValues.person.ci_number,
						program_name: data.program.name,
						matricula_name: `${data.matricula.order}/${data.matricula.gestion}`,
						matricula_fecha: `${data.matricula.createdAt}`,
					};
					return {
						subject_name: data.subject.name,
						qualification: data.qualification,
						approved: data.approved ? 'Aprobado' : 'Reprobado',
					};
				});
				return {
					statusCode: 200,
					status: true,
					message: ['No tiene permisos para esta vista'],
					data: {
						grades: response,
						dataStudent: dataStudent,
					},
				};
			} else {
				return {
					statusCode: 401,
					status: false,
					message: ['No tiene permisos para esta vista'],
				};
			}
		} catch (error) {
			console.log(error);
			return InternalServer('Error en el servidor');
		}
	},
};
