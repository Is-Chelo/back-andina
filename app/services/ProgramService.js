const {Op} = require('sequelize');
const {
	program,
	area,
	subject,
	area_coordinador,
	coordinador,
	matricula,
} = require('../models/index');
const {InternalServer, NotFoundResponse, BadRequest} = require('../utils/response');
const areaServices = require('./AreaService');
const {programTransform} = require('./utils/program-transform');
const {programTransformReport} = require('./utils/reports/program-transform-report');
const {studentTransform} = require('./utils/student-transform');

module.exports = {
	// * Creamos el programa
	async create(body) {
		// const area = await areaServices.show(body.id_area);
		// if (!area.status) return area;
		try {
			const response = await program.create(body);
			return {
				statusCode: 201,
				status: true,
				message: ['Programa Registrado'],
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
				response = await program.findAll({
					include: [{model: area}],
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
				response = await program.findAll({
					include: [
						{
							model: area,
							where: {
								id: {
									[Op.or]: idsAreas,
								},
							},
						},
						{
							model: matricula,
						},
					],
				});
			}
			for (let i = 0; i < response.length; i++) {
				const totalMatriculados = await matricula.count({
					where: {
						id_program: response[i].id,
					},
				});
				response[i].dataValues.total_matricula = totalMatriculados;
			}
			const dataTransform = Object.values(response).map((data, index) => {
				return programTransform(data.dataValues, index + 1);
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
		// console.log(userAuth.rol);
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
				response = await program.findAll({
					include: [{model: area}],
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
				response = await program.findAll({
					include: [
						{
							model: area,
							where: {
								id: {
									[Op.or]: idsAreas,
								},
							},
						},
						{
							model: matricula,
						},
					],
				});
			}
			for (let i = 0; i < response.length; i++) {
				const totalMatriculados = await matricula.count({
					where: {
						id_program: response[i].id,
					},
				});
				response[i].dataValues.total_matricula = totalMatriculados;
			}
			const dataTransform = Object.values(response).map((data, index) => {
				return programTransformReport(data.dataValues, index + 1);
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

	// async reporte() {
	// 	try {
	// 		const response = await program.findAll({
	// 			include: [{model: area}],
	// 		});
	// 		const dataTransform = Object.values(response).map((data) => {
	// 			return programTransformReport(data.dataValues);
	// 		});
	// 		return {
	// 			statusCode: 200,
	// 			status: true,
	// 			message: ['Operacion Exitosa'],
	// 			data: dataTransform,
	// 		};
	// 	} catch (error) {
	// 		console.log(error);
	// 		return InternalServer('Error en el servidor');
	// 	}
	// },

	// * funcion para listar un item
	async show(id) {
		try {
			const response = await program.findOne({
				where: {
					id: id,
				},
				include: [{model: area}],
			});

			if (!response) {
				return NotFoundResponse(`Programa con el id: ${id} no existe. `);
			}
			const dataTransform = programTransform(response.dataValues);
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
		// console.log(body);
		delete body.id_area;
		try {
			const response = await program.findOne({
				where: {
					id: id,
				},
			});
			if (!response) return NotFoundResponse(`Programa con el id: ${id} no existe.`);

			// const area = await areaServices.show(body.id_area);
			// if (!area.status) return area;

			await program.update(body, {
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
			const response = await program.findOne({
				where: {
					id: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`La Program con el id: ${id} que solicitas no existe `);
			}

			await program.destroy({
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

	async showSubjectsByProgram(id) {
		try {
			const response = await subject.findAll({
				where: {
					id_program: id,
				},
			});

			if (!response) {
				return NotFoundResponse(`Programa con el id: ${id} no existe. `);
			}
			const dataTransform = Object.values(response).map((data) => {
				return {
					subject_id: data.dataValues.id,
					subject_name: data.dataValues.name,
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

	async dashBoard() {
		try {
			let whereCoordinador = {};
			let response;

			// const areas = await area.findAll({
			// 	include: [
			// 		{
			// 			model: area_coordinador,
			// 			where: whereCoordinador,
			// 		},
			// 	],
			// });

			// const idsAreas = Object.values(areas).map((area) => area.id);

			response = await program.findAll({
				// include: [
				// 	{
				// 		model: area,
				// 		where: {
				// 			id: {
				// 				[Op.or]: idsAreas,
				// 			},
				// 		},
				// 	},
				// ],
			});

			const dataTransform = Object.values(response).map((data, index) => {
				return programTransform(data.dataValues, index + 1);
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
};
