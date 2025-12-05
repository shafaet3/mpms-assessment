import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet'; // Recommended for security
import router from './routes/index.route'; 

// --- Initialize App ---
const app = express();

// --- Middleware ---

// Security middleware (Helmet)
app.use(helmet()); 

// CORS middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // Adjust for production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Body parsers
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// --- Routes ---
// Mount the main router
app.use('/api/v1', router); 

// --- Health Check Route ---
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ 
    message: 'MPMS Backend Service Online',
    timestamp: new Date().toISOString()
  });
});

// --- Global Error Handler (Must be the last middleware) ---
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Simple error logging
  console.error('Unhandled Error:', err); 
  
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'An unexpected error occurred',
    // In production, only send error stack if necessary/safe
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

export default app;