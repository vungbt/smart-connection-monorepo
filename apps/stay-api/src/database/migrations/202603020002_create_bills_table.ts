import { DataTypes, QueryInterface } from 'sequelize';

const TABLE_NAME = 'bills';

const hasTable = async (queryInterface: QueryInterface, tableName: string) => {
  const tables = await queryInterface.showAllTables();
  return tables.map(table => String(table)).includes(tableName);
};

export const up = async ({ context: queryInterface }: { context: QueryInterface }) => {
  if (await hasTable(queryInterface, TABLE_NAME)) return;

  await queryInterface.createTable(TABLE_NAME, {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    room_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'rooms',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    billing_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    billing_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    electric_number_new: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    water_number_new: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    other_service_fee: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
};

export const down = async ({ context: queryInterface }: { context: QueryInterface }) => {
  if (!(await hasTable(queryInterface, TABLE_NAME))) return;

  await queryInterface.dropTable(TABLE_NAME);
};
