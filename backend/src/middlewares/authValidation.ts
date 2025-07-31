import bcrypt from "bcrypt";
const { body,cookie } = require("express-validator");  

/*Models*/
import user from "@/models/user"; 

export const registerValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 50 })
    .withMessage("Email must be less than 50 characters")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value: string) => {
      const registerUserExists = await user.exists({ email: value });
      if (registerUserExists) {
        throw new Error("User email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 50 })
    .withMessage("Email must be less than 50 characters")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value: string) => {
      const userExists = await user.exists({ email: value });
      if (!userExists) {
        throw new Error("User email or password is invalid");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .custom(async (value: string, { req }: { req: any }) => {
      const { email } = req.body; 
      const userRecord = await user
        .findOne({ email })
        .select("password")
        .lean()
        .exec();

      if (!userRecord) {
        throw new Error("User email or password is invalid");
      }

      const passwordMatch = await bcrypt.compare(value, userRecord.password);

      if (!passwordMatch) {
        throw new Error("User email or password is invalid");
      }
    }),
];

export const refreshTokenValidation = [
  cookie("refreshToken")
    .notEmpty()
    .withMessage("Refresh token required")
    .isJWT()
    .withMessage("Invalid refresh Token"), 
];