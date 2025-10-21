// src/middleware/authenticate.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string; // Supabase user ID (sub)
    role?: string; // Supabase role claim (if needed)
    email?: string; // optional
    [key: string]: any;
  };
}

export function authenticateJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing auth token" });
  }

  try {
    // Verify JWT using Supabase JWT secret
    const payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET!) as any;

    // Attach minimal user info to request
    req.user = {
      id: payload.sub,
      role: payload.role,
      email: payload.email,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
