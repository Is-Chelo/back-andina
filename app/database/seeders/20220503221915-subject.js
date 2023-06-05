'use strict';
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('subjects', [
			{
				name: 'Ingles',
				academics_hours: '25',
				id_program: 1,
				id_teacher: 1,
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Matematicas',
				academics_hours: '25',
				id_program: 1,
				id_teacher: 2,
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Materia-1',
				academics_hours: '25',
				id_program: 2,
				id_teacher: 3,
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Materia-2',
				academics_hours: '25',
				id_program: 3,
				id_teacher: 4,
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('subjects', null, {});
	},
};
