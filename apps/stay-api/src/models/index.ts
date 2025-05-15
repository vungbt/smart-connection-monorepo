import sequelize from '../config/database';
import User from './User';

// Define model associations here
// Example:
// User.hasMany(Post);
// Post.belongsTo(User);

// Initialize models
const models = {
  User,
};

// Function to sync all models with the database
export const syncModels = async (force = false): Promise<void> => {
  try {
    await sequelize.sync({ force });
    console.log('✅ All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Error synchronizing models:', error);
    throw error;
  }
};

export { sequelize };
export default models;
