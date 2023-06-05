'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class area extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.program, {
				foreignKey: 'id_area',
			});
			this.hasMany(models.area_coordinador, {
				foreignKey: 'id_area',
			});
			// define association here
		}
	}
	area.init(
		{
			name: DataTypes.STRING,
			uuid: DataTypes.STRING,
			active: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'area',
		}
	);
	area.beforeCreate((area, options) => {
		area.uuid = uuidv4();
	});
	return area;
};
