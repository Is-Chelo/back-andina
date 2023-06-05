'use strict';
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('areas', [
			{
				name: 'Area-1',
				uuid: uuidv4(),
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Area-2',
				uuid: uuidv4(),
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Area-3',
				uuid: uuidv4(),
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Area-4',
				uuid: uuidv4(),
				active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('areas', null, {});
	},
};
