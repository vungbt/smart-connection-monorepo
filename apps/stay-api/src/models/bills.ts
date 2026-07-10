import sequelize from '@/configs/database';
import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { IBillAttributes } from '@/types';
import RoomsModel from './rooms';

class BillsModel extends Model<IBillAttributes> implements IBillAttributes {
  public id!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
  public roomId!: string;
  public billingMonth!: number;
  public billingYear!: number;
  public electricNumberOld!: number;
  public electricNumberNew!: number;
  public waterNumberOld!: number;
  public waterNumberNew!: number;
  public otherServiceFee?: number;
  public customElectricFee?: number | null;
  public customWaterFee?: number | null;
  public isMoveOutBill?: boolean;
  public note?: string;
}

BillsModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'rooms',
        key: 'id',
      },
    },
    billingMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    billingYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    electricNumberOld: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    electricNumberNew: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    waterNumberOld: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    waterNumberNew: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    otherServiceFee: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    customElectricFee: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    customWaterFee: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    isMoveOutBill: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'bills',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid: true,
  }
);

BillsModel.belongsTo(RoomsModel, {
  foreignKey: 'roomId',
  as: 'room',
});

RoomsModel.hasMany(BillsModel, {
  foreignKey: 'roomId',
  as: 'bills',
});

export default BillsModel;
