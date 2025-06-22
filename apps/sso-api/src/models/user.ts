import { EUserRole } from '@/types/auth';
import { Model, DataTypes } from 'sequelize';
import sequelize from '@/configs/database';
import bcrypt from 'bcryptjs';

export interface IUserAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
  role: EUserRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IUserInstance extends Model<IUserAttributes>, IUserAttributes {
  validatePassword(password: string): Promise<boolean>;
}

const User = sequelize.define<IUserInstance>(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(EUserRole)),
      defaultValue: EUserRole.Member,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'users',
    hooks: {
      beforeCreate: async (user: IUserInstance) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user: IUserInstance) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

(User as any).prototype.validatePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default User;
