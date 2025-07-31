/* custom modules */
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { verifyRefreshToken, generateAccessToken } from "@/lib/jwt";
import { logger } from "@/lib/winston";
import config from "@/config";

/* Types */
import type { Request, Response } from "express";
import { Types } from "mongoose";

/*models*/
import Token from "@/models/token";

const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken as string;

  try {
    const tokenExists = await Token.exists({ token: refreshToken });

    if (!tokenExists) {
      return res.status(401).json({
        code: "AuthenticationError",
        message: "Invalid refresh token",
      });
    }

    const jwtPayload = verifyRefreshToken(refreshToken) as {
      userId: Types.ObjectId;
    };

    const accessToken = generateAccessToken(jwtPayload.userId);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: config.NODE_ENV !== "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 2 * 1000, 
    });

    return res.status(200).json({
      message: "Access token refreshed successfully",
    });
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        code: "AuthenticationError",
        message: "Refresh token expired, please login again",
      });
    }

    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({
        code: "AuthenticationError",
        message: "Invalid refresh token",
      });
    }

    logger.error("Error during refresh token", err);
    return res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error: err,
    });
  }
};

export default refreshToken;
