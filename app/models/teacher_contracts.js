'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class teacher_contracts extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
      this.belongsTo(models.teacher, {
				foreignKey: 'teacher_id',
      })
		}
	}
	teacher_contracts.init(
		{
			teacher_id: DataTypes.INTEGER,
			date_init: DataTypes.DATE,
			date_end: DataTypes.DATE,
			contract_number: DataTypes.STRING,
			active: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'teacher_contracts',
		}
	);
	return teacher_contracts;
};
