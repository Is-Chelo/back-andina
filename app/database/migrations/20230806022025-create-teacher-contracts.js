'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teacher_contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teacher_id: {
        type: Sequelize.INTEGER
      },

      date_init: {
        type: Sequelize.DATE
      },
      date_end: {
        type: Sequelize.DATE
      },
      contract_number: {
        type: Sequelize.STRING
      },
      active: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teacher_contracts');
  }
};