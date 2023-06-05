'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('modulos', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			url: {
				type: Sequelize.STRING,
			},
			icon: {
				type: Sequelize.STRING,
			},
			path_front: {
				type: Sequelize.STRING,
			},
			type: {
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
		await queryInterface.dropTable('modulos');
	},
};
