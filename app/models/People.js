'use strict';
const {Model} = require('sequelize');
const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class people extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.teacher, {
				foreignKey: 'id_people',
			});
			this.hasMany(models.student, {
				foreignKey: 'id_people',
			});
			this.hasMany(models.coordinador, {
				foreignKey: 'id_people',
			});

			this.belongsTo(models.role, {
				foreignKey: 'id_rol',
			});
		}
	}
	people.init(
		{
			name: DataTypes.STRING,
			last_name: DataTypes.STRING,
			email: DataTypes.STRING,
			date_birth: DataTypes.DATE,
			address: DataTypes.STRING,
			cellphone: DataTypes.STRING,
			ci_number: DataTypes.STRING,
			ci_expedition: DataTypes.STRING,
			picture_image: DataTypes.STRING,
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			token_reset_clave: DataTypes.STRING,
			id_rol: DataTypes.INTEGER,
			active: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'people',
		}
	);
	return people;
};
