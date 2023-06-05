'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('rolmodules', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_module: {
				type: Sequelize.INTEGER,
				references: {
					model: 'modulos',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
			id_rol: {
				type: Sequelize.INTEGER,
				references: {
					model: 'roles',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			ok_select: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			ok_update: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			ok_insert: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			ok_delete: {
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
		await queryInterface.dropTable('rolmodules');
	},
};
