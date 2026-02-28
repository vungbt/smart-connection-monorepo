import sequelize from '@/configs/database';
import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { EContractStatus, IContractAttributes } from '@/types';
import RoomsModel from './rooms';
import MembersModel from './members';
import ServicesModel from './services';

class ContractsModel extends Model<IContractAttributes> implements IContractAttributes {
  public id!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
  public roomId!: string;
  public memberId!: string;
  public serviceId!: string;
  public startDate!: Date;
  public endDate?: Date;
  public status!: EContractStatus;
}

ContractsModel.init(
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
    memberId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'members',
        key: 'id',
      },
    },
    serviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id',
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(EContractStatus)),
      allowNull: false,
      defaultValue: EContractStatus.ACTIVE,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'contracts',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid: true,
  }
);

ContractsModel.belongsTo(RoomsModel, {
  foreignKey: 'roomId',
  as: 'room',
});

RoomsModel.hasMany(ContractsModel, {
  foreignKey: 'roomId',
  as: 'contracts',
});

ContractsModel.belongsTo(MembersModel, {
  foreignKey: 'memberId',
  as: 'member',
});

MembersModel.hasMany(ContractsModel, {
  foreignKey: 'memberId',
  as: 'contracts',
});

ContractsModel.belongsTo(ServicesModel, {
  foreignKey: 'serviceId',
  as: 'service',
});

ServicesModel.hasMany(ContractsModel, {
  foreignKey: 'serviceId',
  as: 'contracts',
});

export default ContractsModel;
