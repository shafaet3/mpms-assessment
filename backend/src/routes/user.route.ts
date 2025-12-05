// src/routes/user.route.ts
import { Router, Request, Response } from 'express';
import validate from '../middlewares/validate.middleware';
import { UserRegisterSchema } from '../validators/user.validator';

const router = Router();

// Using the Zod Validation Middleware:
// 1. The request first passes through `validate(UserRegisterSchema)`.
// 2. If valid, it proceeds to the controller (req, res) => {...}.
// 3. If invalid, the `validate` middleware sends the 400 error and stops processing.
router.post(
  '/register',
  validate(UserRegisterSchema),
  (req: Request, res: Response) => {
    // If we reach here, req.body is GUARANTEED to be valid based on UserRegisterSchema!
    const { email, password, name } = req.body;
    
    // In a real app, you would call a service layer here:
    // userService.registerUser({ email, password, name });
    
    console.log('Received valid registration data:', req.body);

    res.status(201).json({ 
      message: 'User registration request received and validated.',
      data: { email, name },
    });
  }
);

export default router;