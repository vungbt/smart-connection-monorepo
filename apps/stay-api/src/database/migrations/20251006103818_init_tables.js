'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;

    await queryInterface.createTable('configs', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      room_fee: { type: DataTypes.FLOAT, allowNull: false },
      water_fee: { type: DataTypes.FLOAT, allowNull: false },
      electric_fee: { type: DataTypes.FLOAT, allowNull: false },
      common_service_fee: { type: DataTypes.FLOAT, allowNull: false },
      internet_fee: { type: DataTypes.FLOAT, allowNull: false },
      type: {
        type: DataTypes.ENUM('DELUXE', 'LUXURY', 'PREMIUM'),
        allowNull: false,
      },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
      deleted_at: { type: DataTypes.DATE, allowNull: true },
    });

    await queryInterface.createTable('rooms', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      config_id: { type: DataTypes.UUID, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
      deleted_at: { type: DataTypes.DATE, allowNull: true },
    });

    await queryInterface.addConstraint('rooms', {
      fields: ['config_id'],
      type: 'foreign key',
      name: 'fk_rooms_config_id',
      references: {
        table: 'configs',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('rooms');
    await queryInterface.dropTable('configs');
  },
};
