// src/middlewares/validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

type AnyObjectSchema = z.ZodObject<any>;
/**
 * Higher-order function that takes a Zod schema and returns an Express middleware.
 * It validates the request body against the schema.
 * @param schema - The Zod schema (e.g., UserRegisterSchema)
 * @returns Express middleware function
 */
const validate = (schema: AnyObjectSchema) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request object against the schema
      // We validate req.body, req.query, and req.params if the schema includes them
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next(); // Validation successful, proceed to controller

    } catch (error) {
      if (error instanceof ZodError) {
        // Map Zod errors into a clean array of issue messages
        const errorMessages = error.issues.map(issue => ({
            field: issue.path.join('.'), // 'body.email'
            message: issue.message,
        }));
        
        // Send a 400 Bad Request response with the validation errors
        return res.status(400).json({
          message: 'Validation failed',
          errors: errorMessages,
        });
      }
      
      // Pass other types of errors to the global error handler
      next(error); 
    }
};

export default validate;