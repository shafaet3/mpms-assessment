import { z } from 'zod';

// Schema for user registration data
export const UserRegisterSchema = z.object({
  body: z.object({
    // email must be a valid email string
    email: z.email('Invalid email format').min(1, 'Email is required'),

    // password must be a string between 8 and 100 characters
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password cannot exceed 100 characters'),
      
    // name is optional
    name: z.string().optional(),
  }),
});

// Infer the TypeScript type from the schema for type safety
export type UserRegisterType = z.infer<typeof UserRegisterSchema>['body'];