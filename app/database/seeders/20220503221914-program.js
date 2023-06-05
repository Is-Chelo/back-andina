'use strict';
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('programs', [
			{
				name: 'Program-1',
				version: 'Prog-1',
				uuid: uuidv4(),
				date_init: new Date(),
				date_end: new Date(),
				id_area: 1,
				sede: 'sucre',
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Program-2',
				version: 'Prog-2',
				uuid: uuidv4(),
				date_init: new Date(),
				date_end: new Date(),
				id_area: 1,
				sede: 'sucre',
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Program-3',
				version: 'Prog-3',
				uuid: uuidv4(),
				date_init: new Date(),
				date_end: new Date(),
				id_area: 2,
				sede: 'sucre',
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Program-4',
				version: 'Prog-4',
				uuid: uuidv4(),
				date_init: new Date(),
				date_end: new Date(),
				id_area: 2,
				sede: 'sucre',
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('programs', null, {});
	},
};
