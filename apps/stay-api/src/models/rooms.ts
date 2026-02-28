import sequelize from '@/configs/database';
import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { IRoomAttributes } from '@/types';
import ServicesModel from './services';

class RoomsModel extends Model<IRoomAttributes> implements IRoomAttributes {
  public id!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
  public name!: string;
  public serviceId!: string;
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
    serviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'services',
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

RoomsModel.belongsTo(ServicesModel, {
  foreignKey: 'serviceId',
  as: 'service',
});

ServicesModel.hasMany(RoomsModel, {
  foreignKey: 'serviceId',
  as: 'rooms',
});

export default RoomsModel;
