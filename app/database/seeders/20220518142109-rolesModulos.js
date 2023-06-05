'use strict';
const {modulo, role, rolemodule} = require('../../models/index');

// 	dashboard: 1,
// 	matriculaciones: 5,
// 	areas: 6,
// 	programas: 7,
// 	asignaturas: 8,
// 	calificaciones: 9,
// 	kardex: 10,

// id: 1, // dashboard
// id: 9, // calificaciones
// id: 10, // kardex

// dashboard: 1,
// matriculaciones: 5,
// calificaciones: 9,

module.exports = {
	async up(queryInterface, Sequelize) {
		const countModulos = await modulo.count();
		const data = [];
		for (let i = 1; i <= countModulos; i++)
			data.push({
				id_module: i,
				id_rol: 1,
				ok_select: 1,
				ok_update: 1,
				ok_insert: 1,
				ok_delete: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		const modules = await modulo.findOne({
			where: {
				url: '/api/v1/role-module',
			},
		});

		const roles = await role.findAll();
		for (let i = 0; i < roles.length; i++) {
			if (roles[i].dataValues.id !== 1)
				data.push({
					id_module: modules.id,
					id_rol: roles[i].dataValues.id,
					ok_select: 1,
					ok_update: 0,
					ok_insert: 0,
					ok_delete: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
		}
		// STUDENTS
		data.push(
			{
				id_module: 1,
				id_rol: 4,
				ok_select: 1,
				ok_update: 0,
				ok_insert: 0,
				ok_delete: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_module: 9,
				id_rol: 4,
				ok_select: 1,
				ok_update: 0,
				ok_insert: 0,
				ok_delete: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_module: 10,
				id_rol: 4,
				ok_select: 1,
				ok_update: 0,
				ok_insert: 0,
				ok_delete: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		);
		// TODO: TEACHERS
		data.push(
			{
				id_module: 1,
				id_rol: 2,
				ok_select: 1,
				ok_update: 0,
				ok_insert: 0,
				ok_delete: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_module: 9,
				id_rol: 2,
				ok_select: 1,
				ok_update: 1,
				ok_insert: 0,
				ok_delete: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		);
		// TODO:  COORDINADOR
		// 	dashboard: 1,
		// 	matriculaciones: 5,
		// 	areas: 6,
		// 	programas: 7,
		// 	asignaturas: 8,
		// 	calificaciones: 9,
		// 	kardex: 10,
		//  docentes: 2
		//  estudiantes: 3,
		//  Coordinadores: 4

		data.push(
			{
				id_module: 3,
				id_rol: 3,
				ok_select: 1,
				ok_update: 1,
				ok_insert: 1,
				ok_delete: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_module: 2,
				id_rol: 3,
				ok_select: 1,
				ok_update: 1,
				ok_insert: 1,
				ok_delete: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_module: 1,
				id_rol: 3,
				ok_select: 1,
				ok_update: 1,
				ok_insert: 1,
				ok_delete: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_module: 5,
				id_rol: 3,
				ok_select: 1,
				ok_update: 1,
				ok_insert: 1,
				ok_delete: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_module: 6,
				id_rol: 3,
				ok_select: 1,
				ok_update: 0,
				ok_insert: 0,
				ok_delete: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_module: 7,
				id_rol: 3,
				ok_select: 1,
				ok_update: 1,
				ok_insert: 1,
				ok_delete: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_module: 8,
				id_rol: 3,
				ok_select: 1,
				ok_update: 1,
				ok_insert: 1,
				ok_delete: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		);

		await queryInterface.bulkInsert('rolmodules', data);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('rolmodules', null, {});
	},
};
