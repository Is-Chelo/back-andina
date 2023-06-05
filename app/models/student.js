'use strict';
const { Model } = require('sequelize');
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class student extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.matricula, {
				foreignKey: 'id_student',
			});

			this.belongsTo(models.people, {
				foreignKey: 'id_people',
			});
			this.hasMany(models.student_grades, {
				foreignKey: 'id_student',
			});
			// define association here
		}
	}
	student.init(
		{
			type_rol: DataTypes.STRING,
			uuid: DataTypes.STRING,
			active: DataTypes.BOOLEAN,
			id_people: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'student',
		}
	);
	student.beforeCreate((student, options) => {
		student.uuid = uuidv4();
	});
	return student;
};
