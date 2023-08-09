'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('people', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			last_name: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
			},
			date_birth: {
				type: Sequelize.DATE,
			},
			address: {
				type: Sequelize.STRING,
			},
			cellphone: {
				type: Sequelize.STRING,
			},
			ci_number: {
				type: Sequelize.STRING,
				unique: true,
			},
			ci_expedition: {
				type: Sequelize.STRING,
			},
			picture_image: {
				type: Sequelize.STRING,
			},
			username: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			token_reset_clave: {
				type: Sequelize.STRING,
			},
			active: {
				type: Sequelize.BOOLEAN,
			},
			id_rol: {
				type: Sequelize.INTEGER,
				references: {
					model: 'roles',
					key: 'id',
				},
				onDelete: 'SET NULL',
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
		await queryInterface.dropTable('people');
	},
};
