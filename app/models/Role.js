'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require('uuid');
module.exports = (sequelize, DataTypes) => {
	class role extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// this.hasMany(models.People, {
			// 	foreignKey: 'id_rol',
			// });
			this.hasMany(models.rolmodule, {
				foreignKey: 'id_rol',
			});

			this.hasMany(models.people, {
				foreignKey: 'id_rol',
			});
		}
	}
	role.init(
		{
			name: DataTypes.STRING,
			uuid: DataTypes.STRING,
			active: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'role',
		}
	);
	role.beforeCreate((role, options) => {
		role.uuid = uuidv4();
	});
	return role;
};
