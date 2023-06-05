'use strict';
const {v4: uuidv4} = require('uuid');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('roles', [
			{
				id: '1',
				name: 'Admin',
				active: true,
				uuid: uuidv4(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: '2',
				name: 'Docente',
				active: true,
				uuid: uuidv4(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: '3',
				name: 'Coordinador',
				active: true,
				uuid: uuidv4(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: '4',
				name: 'Estudiante',
				active: true,
				uuid: uuidv4(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('roles', null, {});
	},
};
