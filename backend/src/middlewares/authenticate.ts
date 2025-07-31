import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { verifyAccessToken } from "@/lib/jwt";
import { logger } from "@/lib/winston";

/*Types*/
import type { Request, Response, NextFunction } from "express";
import type { Types } from "mongoose";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    res.status(401).json({
      code: "AuthenticationError",
      message: "Access denied, no token provided",
    });
    return;
  }

  try {
    const jwtPayload = verifyAccessToken(accessToken) as {
      userId: Types.ObjectId;
    };

    req.userId = jwtPayload.userId;

    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({
        code: "AuthenticationError",
        message: "Access token expired, request a new one with refresh token",
      });
      return;
    }

    if (err instanceof JsonWebTokenError) {
      res.status(401).json({
        code: "AuthenticationError",
        message: "Access token invalid",
      });
      return;
    }

    res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error: err,
    });

    logger.error("Error during authentication", err);
  }
};

export default authenticate;
