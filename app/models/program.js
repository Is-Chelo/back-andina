'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class program extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.area, {
				foreignKey: 'id_area',
			});
			this.hasMany(models.matricula, {
				foreignKey: 'id_program',
			});
			// define association here
			this.hasMany(models.subject, {
				foreignKey: 'id_program',
			});
			this.hasMany(models.student_grades, {
				foreignKey: 'id_program',
			});
		}
	}
	program.init(
		{
			name: DataTypes.STRING,
			version: DataTypes.STRING,
			uuid: DataTypes.STRING,
			date_init: DataTypes.DATE,
			date_end: DataTypes.DATE,
			id_area: DataTypes.INTEGER,
			active: DataTypes.BOOLEAN,
			sede: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'program',
		}
	);
	program.beforeCreate((program, options) => {
		program.uuid = uuidv4();
	});

	return program;
};
