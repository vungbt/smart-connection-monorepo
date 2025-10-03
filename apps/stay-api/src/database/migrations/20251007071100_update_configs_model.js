'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('members', 'phone_number', 'phone');
    await queryInterface.removeColumn('members', 'email');
  },

  async down(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    await queryInterface.renameColumn('members', 'phone', 'phone_number');
    await queryInterface.addColumn('members', 'email', {
      type: DataTypes.STRING,
      allowNull: false,
    });
  },
};
