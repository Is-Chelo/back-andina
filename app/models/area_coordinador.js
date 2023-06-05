'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class area_coordinador extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.area, {
				foreignKey: 'id_area',
			});

			this.belongsTo(models.coordinador, {
				foreignKey: 'id_coordinador',
			});
		}
	}
	area_coordinador.init(
		{
			id_area: DataTypes.INTEGER,
			id_coordinador: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'area_coordinador',
		}
	);
	return area_coordinador;
};
