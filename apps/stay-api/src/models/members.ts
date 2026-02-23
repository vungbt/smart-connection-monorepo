import sequelize from '@/configs/database';
import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { IMemberAttributes } from '@/types';
import RoomsModel from './rooms';

class MembersModel extends Model<IMemberAttributes> implements IMemberAttributes {
  public id!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
  public name!: string;
  public phone!: string;
  public address!: string;
  public isActive!: boolean;
  public identityCardNumber!: string;
  public roomId!: string;
}

MembersModel.init(
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    identityCardNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'rooms',
        key: 'id',
      },
    },
  },
  {
    sequelize: sequelize,
    modelName: 'members',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid: true,
  }
);

MembersModel.belongsTo(RoomsModel, {
  foreignKey: 'roomId',
  as: 'room',
});

RoomsModel.hasMany(MembersModel, {
  foreignKey: 'roomId',
  as: 'members',
});

export default MembersModel;
