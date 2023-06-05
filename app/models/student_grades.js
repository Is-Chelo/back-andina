'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class student_grades extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.student, {
				foreignKey: 'id_student',
			});
			this.belongsTo(models.subject, {
				foreignKey: 'id_subject',
			});
			this.belongsTo(models.matricula, {
				foreignKey: 'id_matricula',
			});
			this.belongsTo(models.program, {
				foreignKey: 'id_program',
			});
		}
	}
	student_grades.init(
		{
			id_student: DataTypes.INTEGER,
			id_subject: DataTypes.INTEGER,
			id_matricula: DataTypes.INTEGER,
			id_program: DataTypes.INTEGER,
			order: DataTypes.INTEGER,
			qualification: DataTypes.DOUBLE,
			qualified: DataTypes.BOOLEAN,
			average: DataTypes.DOUBLE,
			approved: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'student_grades',
		}
	);
	return student_grades;
};
