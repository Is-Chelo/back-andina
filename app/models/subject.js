'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class subject extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.program, {
				foreignKey: 'id_program',
			});
			this.belongsTo(models.teacher, {
				foreignKey: 'id_teacher',
			});
			this.hasMany(models.student_grades, {
				foreignKey: 'id_subject',
			});
		}
	}
	subject.init(
		{
			name: DataTypes.STRING,
			academics_hours: DataTypes.STRING,
			active: DataTypes.BOOLEAN,
			id_program: DataTypes.INTEGER,
			id_teacher: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'subject',
		}
	);
	return subject;
};
