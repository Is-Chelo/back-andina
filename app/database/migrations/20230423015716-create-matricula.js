'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('matriculas', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_program: {
				type: Sequelize.INTEGER,
				references: {
					model: 'programs',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			id_student: {
				type: Sequelize.INTEGER,
				references: {
					model: 'students',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			active: {
				type: Sequelize.BOOLEAN,
			},
			order: {
				type: Sequelize.INTEGER,
			},
			gestion: {
				type: Sequelize.STRING,
			},
			uuid: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable('matriculas');
	},
};
