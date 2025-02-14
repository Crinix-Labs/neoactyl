import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { config } from './config/config';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';
import { authRoutes } from './routes/auth.routes';
import { serverRoutes } from './routes/servers.routes';
import { coinRoutes } from './routes/coins.routes';
import { storeRoutes } from './routes/store.routes';
import { sequelize } from './config/database';

const app = express();

// Enhanced error logging
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<any>) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Trust proxy - required for rate limiting behind reverse proxies
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://your-production-domain.com' : 'http://localhost:5000',
  credentials: true
}));
app.use(apiLimiter);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/servers', serverRoutes);
app.use('/api/coins', coinRoutes);
app.use('/api/store', storeRoutes);

// Health check route with detailed status
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await sequelize.authenticate();

    res.json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasJwtSecret: !!config.jwtSecret,
        hasPterodactylConfig: !!(config.pterodactyl.url && config.pterodactyl.apiKey)
      }
    });
  } catch (err) {
    const error = err as Error;
    console.error('Health check failed:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error?.message || 'Internal server error'
    });
  }
});

// Root route - redirect to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling
app.use(errorHandler);

// Start server
const PORT = Number(config.port) || 5000;

// Initialize database and start server
const startServer = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync database models
    await sequelize.sync();
    console.log('Database models synchronized.');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('Environment check:', {
        nodeEnv: process.env.NODE_ENV,
        hasJwtSecret: !!config.jwtSecret,
        hasPterodactylUrl: !!config.pterodactyl.url,
        hasPterodactylApiKey: !!config.pterodactyl.apiKey
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;