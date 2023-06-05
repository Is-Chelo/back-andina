'use strict';
const bcrypt = require('bcrypt');
const { people } = require('../../models/index');
const {v4: uuidv4} = require('uuid');

module.exports = {
	async up(queryInterface, Sequelize) {
		const datos = await people.findAll({
			where: {
				id_rol: 4,
			},
		});
		const arraydata = [];
		Object.values(datos).forEach((person) => {
			arraydata.push({
				type_rol: 'Estudiante',
				uuid: uuidv4(),
				active: 1,
				id_people: person.dataValues.id,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		});
		await queryInterface.bulkInsert('students', arraydata);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('students', null, {});
	},
};
