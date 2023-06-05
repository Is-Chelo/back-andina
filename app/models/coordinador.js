'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class coordinador extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.people, {
				foreignKey: 'id_people',
			});

			this.hasMany(models.area_coordinador, {
				foreignKey: 'id_coordinador',
			});
			// define association here
		}
	}
	coordinador.init(
		{
			id_people: DataTypes.INTEGER,
			uuid: DataTypes.STRING,
			type_rol: DataTypes.STRING,
			active: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'coordinador',
		}
	);
	coordinador.beforeCreate((coor, options) => {
		coor.uuid = uuidv4();
	});
	return coordinador;
};
