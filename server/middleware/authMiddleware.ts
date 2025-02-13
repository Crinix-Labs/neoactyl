import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthenticatedRequest extends Request {
  user?: {
    apiKey: string
  }
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { apiKey: string }
    req.user = { apiKey: decoded.apiKey }
    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}

