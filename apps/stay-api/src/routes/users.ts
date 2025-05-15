import express, { Request, Response, Router } from 'express';
import User from '../models/User';

const router: Router = express.Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // Don't return passwords
    });
    return res.status(200).json({ test: 'test 1' });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Error fetching users',
    });
  }
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found',
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Error fetching user',
    });
  }
});

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Basic validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Missing required fields',
      });
    }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'User with this email already exists',
      });
    }

    // Create user
    const user = await User.create({
      email,
      password, // In a real app, hash the password before storing
      firstName,
      lastName,
    });

    // Return the created user (exclude password)
    const userWithoutPassword = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] },
    });

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Error creating user',
    });
  }
});

// Update a user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, isActive } = req.body;
    const userId = req.params.id;

    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found',
      });
    }

    // Update user fields
    await user.update({
      firstName: firstName !== undefined ? firstName : user.firstName,
      lastName: lastName !== undefined ? lastName : user.lastName,
      isActive: isActive !== undefined ? isActive : user.isActive,
    });

    // Return updated user (exclude password)
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Error updating user',
    });
  }
});

// Delete a user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found',
      });
    }

    // Delete the user
    await user.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Error deleting user',
    });
  }
});

export default router;
