// src/middleware/authenticate.ts
import { Request, Response, NextFunction } from "express";
import { verifySupabaseJWT } from "../lib/jwks";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role?: string;
    email?: string;
    [key: string]: any;
  };
}

export async function authenticateJWT(
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
    const payload = (await verifySupabaseJWT(token)) as any;

    // Attach minimal user info
    req.user = {
      id: payload.sub,
      role: payload.role,
      email: payload.email,
      // you can include other claims if needed
    };

    next();
  } catch (err) {
    console.error("JWT verification failed", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
