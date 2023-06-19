const {InternalServer} = require('../utils/response');
const {student_grades, subject, matricula, program, student, seople} = require('../models/index');
const studentService = require('./StudentService');
const {kardexTransform} = require('./utils/kardex-transform');
const {kardexTransformReporte} = require('./utils/reports/kardex-transform-report');
module.exports = {
	async kardexByStudent(idStudent, idProgram, authUser) {
		let whereProgram;
		if (
			idProgram === 'undefined' ||
			idProgram === 'null' ||
			idProgram === undefined ||
			idProgram === null
		)
			whereProgram = {};
		else
			whereProgram = {
				id_program: idProgram,
			};

		try {
			let responseEstudiante;
			let response;
			let studentExist;
			if (authUser.rol === 4) {
				responseEstudiante = await student.findOne({
					where: {
						id_people: authUser.id,
					},
				});
				studentExist = await studentService.show(responseEstudiante.id);
				if (studentExist.status === false) return studentExist;
			} else {
				studentExist = await studentService.findByCiNumber(idStudent);
				if (studentExist.status === false) return studentExist;
			}

			response = await student_grades.findAll({
				where: {
					id_student: studentExist.data.id,
					qualified: true,
					// aqui va el programa
					...whereProgram,
				},
				include: [{model: subject}, {model: program}, {model: matricula}],
			});

			let sumTotal = 0;
			let countTotal = 0;
			response = Object.values(response).map((data) => {
				sumTotal += data.dataValues.qualification;
				countTotal += 1;
				return kardexTransform(data.dataValues);
			});

			return {
				statusCode: 200,
				status: true,
				message: ['Operacion Exitosa'],
				data: {
					student: studentExist.data,
					promedio: sumTotal / countTotal,
					kardex: response,
				},
			};
		} catch (error) {
			console.log('Error en Kardex service: ', error);
			return InternalServer('Error en el servidor');
		}
	},
	async reporte(idStudent, authUser) {
		try {
			let responseEstudiante;
			let response;
			let studentExist;
			if (authUser.rol === 4) {
				responseEstudiante = await student.findOne({
					where: {
						id_people: authUser.id,
					},
				});
				studentExist = await studentService.show(responseEstudiante.id);
				if (studentExist.status === false) return studentExist;
			} else {
				studentExist = await studentService.findByCiNumber(idStudent);
				if (studentExist.status === false) return studentExist;
			}

			response = await student_grades.findAll({
				where: {
					id_student: studentExist.data.id,
					qualified: true,
				},
				include: [{model: subject}, {model: program}, {model: matricula}],
			});

			let sumTotal = 0;
			let countTotal = 0;
			response = Object.values(response).map((data) => {
				sumTotal += data.dataValues.qualification;
				countTotal += 1;
				return kardexTransformReporte(data.dataValues);
			});

			return {
				statusCode: 200,
				status: true,
				message: ['Operacion Exitosa'],
				data: {
					student: studentExist.data,
					promedio: sumTotal / countTotal,
					kardex: response,
				},
			};
		} catch (error) {
			console.log('Error en Kardex service: ', error);
			return InternalServer('Error en el servidor');
		}
	},
};
