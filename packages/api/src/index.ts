/**
 * Idea Stock Exchange API Server
 * Backend for ReasonRank multi-platform application
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import argumentsRouter from './routes/arguments';
import evidenceRouter from './routes/evidence';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'ideastockexchange-api',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/arguments', argumentsRouter);
app.use('/api/evidence', evidenceRouter);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Idea Stock Exchange API',
    version: '1.0.0',
    description: 'Backend API for ReasonRank argument evaluation system',
    endpoints: {
      arguments: {
        'GET /api/arguments': 'List all arguments',
        'GET /api/arguments/:id': 'Get argument details',
        'POST /api/arguments': 'Create new argument',
        'PUT /api/arguments/:id': 'Update argument',
        'DELETE /api/arguments/:id': 'Delete argument',
        'POST /api/arguments/:id/calculate-score': 'Calculate ReasonRank score'
      },
      evidence: {
        'POST /api/arguments/:argumentId/evidence': 'Add evidence to argument',
        'PUT /api/evidence/:id': 'Update evidence',
        'DELETE /api/evidence/:id': 'Delete evidence'
      }
    },
    documentation: 'https://github.com/myklob/ideastockexchange'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║   Idea Stock Exchange API Server                         ║
║   ReasonRank: PageRank for Truth                          ║
╟───────────────────────────────────────────────────────────╢
║   Port: ${PORT}                                            ║
║   Environment: ${process.env.NODE_ENV || 'development'}   ║
║   Endpoints: http://localhost:${PORT}/api                 ║
║   Health: http://localhost:${PORT}/health                 ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;
