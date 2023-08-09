'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('programs', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			version: {
				type: Sequelize.STRING,
			},
			uuid: {
				type: Sequelize.STRING,
			},
			date_init: {
				type: Sequelize.DATE,
			},
			date_end: {
				type: Sequelize.DATE,
			},
			id_area: {
				type: Sequelize.INTEGER,
				references: {
					model: 'areas',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
			sede: {
				type: Sequelize.STRING,
			},
			resolution_number: {
				type: Sequelize.STRING,
			},
			active: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
		await queryInterface.dropTable('programs');
	},
};
