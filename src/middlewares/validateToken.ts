import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any;
}

// validateToken
const validateToken = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token;
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || "",
        (err: any, decoded: any) => {
          if (err) {
            res.status(401).json({ message: "User is not authorized" });
          }
          (req as any).user = decoded.user;
          next();
        }
      );
    } else {
      res
        .status(401)
        .json({ message: "User is not authorized or token is missing" });
    }
  }
);

export default validateToken;
