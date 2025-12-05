// src/routes/index.route.ts
import { Router } from 'express';
import userRoutes from './user.route'; 

const router = Router();

// Example route mounting:
router.use('/users', userRoutes);

export default router;