/**
 * Stay API Server
 * A production-ready Express.js backend
 */

import express, { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { testConnection } from './config/database';
import { syncModels } from './models';
import userRoutes from './routes/users';

// Initialize express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // HTTP request logger

// Static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to stay-api!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      users: '/api/users',
    },
  });
});

// Register routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found',
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    // Sync models with database
    // Set to true to drop tables and recreate them (only for development)
    await syncModels(
      process.env.NODE_ENV === 'development' && process.env.DB_FORCE_SYNC === 'true'
    );

    // Start server
    const port = process.env.PORT || 3333;
    const server = app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
      console.log(`📝 API documentation available at http://localhost:${port}/api`);
    });

    // Handle server errors
    server.on('error', (error: Error) => {
      console.error('Server error:', error);
      process.exit(1);
    });

    // Handle process termination
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();
