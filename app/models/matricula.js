'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class matricula extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.program, {
				foreignKey: 'id_program',
			});
			this.belongsTo(models.student, {
				foreignKey: 'id_student',
			});
			this.hasMany(models.student_grades, {
				foreignKey: 'id_matricula',
			});
			// define association here
		}
	}
	matricula.init(
		{
			id_program: DataTypes.INTEGER,
			id_student: DataTypes.INTEGER,
			active: DataTypes.BOOLEAN,
			order: DataTypes.INTEGER,
			gestion: DataTypes.STRING,
			uuid: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'matricula',
		}
	);
	matricula.beforeCreate((matricula, options) => {
		matricula.uuid = uuidv4();
	});
	return matricula;
};
