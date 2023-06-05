'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class teacher extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.people, {
				foreignKey: 'id_people',
			});
			this.hasMany(models.subject, {
				foreignKey: 'id_teacher',
			});
			// define association here
		}
	}
	teacher.init(
		{
			type_rol: DataTypes.STRING,
			uuid: DataTypes.STRING,
			academics_hours: DataTypes.DECIMAL,
			active: DataTypes.BOOLEAN,
			id_people: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'teacher',
		}
	);
	teacher.beforeCreate((teacher, options) => {
		teacher.uuid = uuidv4();
	});
	return teacher;
};
