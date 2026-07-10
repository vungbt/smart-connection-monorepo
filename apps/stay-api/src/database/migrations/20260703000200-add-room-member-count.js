'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('rooms');

    if (!table.member_count) {
      await queryInterface.addColumn('rooms', 'member_count', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable('rooms');

    if (table.member_count) {
      await queryInterface.removeColumn('rooms', 'member_count');
    }
  },
};
