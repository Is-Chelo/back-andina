'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('teachers', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			type_rol: {
				type: Sequelize.STRING,
			},
			uuid: {
				type: Sequelize.STRING,
			},
			// academics_hours: {
			// 	type: Sequelize.DECIMAL,
			// },
			active: {
				type: Sequelize.BOOLEAN,
			},
			id_people: {
				type: Sequelize.INTEGER,
				references: {
					model: 'people',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('teachers');
	},
};
