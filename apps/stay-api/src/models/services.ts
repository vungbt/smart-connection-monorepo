import sequelize from '@/configs/database';
import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { EServiceType, IServiceAttributes } from '@/types';

class ServicesModel extends Model<IServiceAttributes> implements IServiceAttributes {
  public id!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
  public roomFee!: number;
  public waterFee!: number;
  public electricFee!: number;
  public electricBikeFee!: number;
  public commonServiceFee!: number;
  public internetFee!: number;
  public type!: EServiceType;
}

ServicesModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    roomFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    waterFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    electricFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    electricBikeFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    commonServiceFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    internetFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(EServiceType)),
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'services',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid: true,
  }
);

export default ServicesModel;
