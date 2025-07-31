import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { verifyAccessToken } from "@/lib/jwt";
import { logger } from "@/lib/winston";
import refreshToken from "@/controllers/v1/auth/refresh_token";

/*Types*/
import type { Request, Response, NextFunction } from "express";
import type { Types } from "mongoose";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  // const authHeaders = req.headers.authorization;

  // If no Baarer token.
  // if (!authHeaders?.startsWith("Bearer")) {
  if (!accessToken) {
    res.status(401).json({
      code: "AuthenticationError",
      message: "Access denied, no token provided",
    });
    return;
  }

  // const [_, token] = authHeaders.split(" ");

  try {
    // Verify the token and extract the userId from the payload
    // const jwtPayload = verifyAccessToken(token) as { userId: Types.ObjectId };
    const jwtPayload = verifyAccessToken(accessToken) as {
      userId: Types.ObjectId;
    };

    // Attach the userId to the request for later use.
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
