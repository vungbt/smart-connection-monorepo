/* eslint-disable @typescript-eslint/no-explicit-any */
import { EProvider, IFileAttributes } from '@/types';
import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '@/configs/database';

class FilesModel extends Model<IFileAttributes> implements IFileAttributes {
  public id!: string;
  public url?: string;
  public storageId!: string;
  public provider?: EProvider;
  public metadata?: any;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
}

FilesModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    storageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider: {
      type: DataTypes.ENUM(EProvider.S3, EProvider.Cloudinary, EProvider.System),
      defaultValue: EProvider.Cloudinary,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'files',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid: true,
  }
);

export default FilesModel;
