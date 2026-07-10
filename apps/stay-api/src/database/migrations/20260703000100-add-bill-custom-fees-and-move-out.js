'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('bills');

    if (!table.custom_electric_fee) {
      await queryInterface.addColumn('bills', 'custom_electric_fee', {
        type: Sequelize.FLOAT,
        allowNull: true,
      });
    }

    if (!table.custom_water_fee) {
      await queryInterface.addColumn('bills', 'custom_water_fee', {
        type: Sequelize.FLOAT,
        allowNull: true,
      });
    }

    if (!table.is_move_out_bill) {
      await queryInterface.addColumn('bills', 'is_move_out_bill', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable('bills');

    if (table.custom_electric_fee) {
      await queryInterface.removeColumn('bills', 'custom_electric_fee');
    }

    if (table.custom_water_fee) {
      await queryInterface.removeColumn('bills', 'custom_water_fee');
    }

    if (table.is_move_out_bill) {
      await queryInterface.removeColumn('bills', 'is_move_out_bill');
    }
  },
};
