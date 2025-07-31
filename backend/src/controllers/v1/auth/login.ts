/*custom modules*/
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { logger } from "@/lib/winston";
import config from "@/config";

/* models */
import User from "@/models/user";
import Token from "@/models/token";

/*Types*/
import type { Request, Response } from "express";
import type { IUser } from "@/models/user";

type UserData = Pick<IUser, "email" | "password">;

const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body as UserData;

    const user = await User.findOne({ email })
      .select("username email password role")
      .lean()
      .exec();

    if (!user) {
      res.status(404).json({
        code: "Not Found",
        message: "User not found",
      });
      return;
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await Token.create({ token: refreshToken, userId: user._id });
    logger.info("Refresh token created for user", {
      userId: user._id,
      token: refreshToken,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV !== "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30 * 1000, 
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: config.NODE_ENV !== "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 2 * 1000, 
    });

    res.status(201).json({
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    logger.info("User registered successfully", user);
  } catch (err) {
    res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error: err,
    });

    logger.error("Error during user registeration", err);
  }
};

export default signin;
