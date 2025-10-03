import sequelize from '@/configs/database';
import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { IRoomAttributes } from '@/types';
import ConfigsModel from './configs';

class RoomsModel extends Model<IRoomAttributes> implements IRoomAttributes {
  public id!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
  public name!: string;
  public configId!: string;
}

RoomsModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    configId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'configs',
        key: 'id',
      },
    },
  },
  {
    sequelize: sequelize,
    modelName: 'rooms',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid: true,
  }
);

RoomsModel.belongsTo(ConfigsModel, {
  foreignKey: 'configId',
  as: 'config',
});

ConfigsModel.hasMany(RoomsModel, {
  foreignKey: 'configId',
  as: 'rooms',
});

export default RoomsModel;
