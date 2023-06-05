'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class rolmodule extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.modulo, {
				foreignKey: 'id_module',
			});
			this.belongsTo(models.role, {
				foreignKey: 'id_rol',
			});
		}
	}
	rolmodule.init(
		{
			id_module: DataTypes.INTEGER,
			id_rol: DataTypes.INTEGER,
			ok_select: DataTypes.BOOLEAN,
			ok_update: DataTypes.BOOLEAN,
			ok_insert: DataTypes.BOOLEAN,
			ok_delete: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'rolmodule',
		}
	);
	return rolmodule;
};
