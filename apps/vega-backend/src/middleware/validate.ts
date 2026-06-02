import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        return res.status(400).json({ error: "Validation failed", issues });
      }
      return res.status(400).json({ error: "Invalid request body" });
    }
  };
}

export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query) as unknown as typeof req.query;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        return res.status(400).json({ error: "Validation failed", issues });
      }
      return res.status(400).json({ error: "Invalid query parameters" });
    }
  };
}

export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params) as unknown as typeof req.params;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        return res.status(400).json({ error: "Validation failed", issues });
      }
      return res.status(400).json({ error: "Invalid URL parameters" });
    }
  };
}
