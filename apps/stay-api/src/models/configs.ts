import sequelize from '@/configs/database';
import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { EConfigType, IConfigAttributes } from '@/types';

class ConfigsModel extends Model<IConfigAttributes> implements IConfigAttributes {
  public id!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
  public roomFee!: number;
  public waterFee!: number;
  public electricFee!: number;
  public commonServiceFee!: number;
  public internetFee!: number;
  public type!: EConfigType;
}

ConfigsModel.init(
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
    commonServiceFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    internetFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(EConfigType)),
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'configs',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid: true,
  }
);

export default ConfigsModel;
