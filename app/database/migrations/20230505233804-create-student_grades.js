'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('student_grades', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
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
			id_subject: {
				type: Sequelize.INTEGER,
				references: {
					model: 'subjects',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			id_matricula: {
				type: Sequelize.INTEGER,
				references: {
					model: 'matriculas',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
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
			order: {
				type: Sequelize.INTEGER,
			},
			qualification: {
				type: Sequelize.DOUBLE,
			},
			qualified: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			average: {
				type: Sequelize.DOUBLE,
			},
			approved: {
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable('student_grades');
	},
};
