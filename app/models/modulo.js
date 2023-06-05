'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class modulo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.rolmodule, {
				foreignKey: 'id_module',
			});
		}
	}
	modulo.init(
		{
			name: DataTypes.STRING,
			url: DataTypes.STRING,
			icon: DataTypes.STRING,
			path_front: DataTypes.STRING,
			type: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'modulo',
		}
	);
	
	return modulo;
};
