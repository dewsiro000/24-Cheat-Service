import { logger } from "@/lib/winston";

/*Models*/
import Token from "@/models/token";

/*Types*/
import type { Request, Response } from "express";
import config from "@/config";

const signout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken as string;

    await deleteToken(refreshToken);

    clearCookie(res, "refreshToken");
    clearCookie(res, "accessToken");

    res.sendStatus(204);

    logger.info("User logged out successfully", {
      userId: req.userId,
    });
  } catch (err) {
    res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error: err,
    });

    logger.error("Error during logout", err);
  }
};

export default signout;

const deleteToken = async (refreshToken: string): Promise<void> => {
  try {
    if (refreshToken) {
      await Token.deleteOne({ token: refreshToken });
      logger.info("User refresh token deleted successfully", {
        refreshToken,
      });
    }
  } catch (err) {
    logger.error("Error deleting refresh token.", err);
    throw new Error("Token deletion failed");
  }
};

const clearCookie = (res: Response, cookieName: string): void => {
  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
  });
};
