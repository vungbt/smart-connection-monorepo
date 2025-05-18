import sequelize from '@/configs/database';
import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { IConfigAttributes } from '@/types';

class ConfigsModel extends Model<IConfigAttributes> implements IConfigAttributes {
  public id!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
  public config!: number;
  public waterFee!: number;
  public electricFee!: number;
  public commonServiceFee!: number;
  public internetFee!: number;
  public type!: string;
  public isSpecialRoom!: boolean;
}

ConfigsModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    config: {
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSpecialRoom: {
      type: DataTypes.BOOLEAN,
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
    paranoid: true, // Enables soft deletes using deletedAt
  }
);

export default ConfigsModel;
