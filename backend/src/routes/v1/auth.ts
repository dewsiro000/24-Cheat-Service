import { Router } from "express";

/* controllers */
import signup from "@/controllers/v1/auth/register";
import signin from "@/controllers/v1/auth/login";
import refreshToken from "@/controllers/v1/auth/refresh_token";
import signout from "@/controllers/v1/auth/logout";

/*Middlewares*/
import validationError from "@/middlewares/validationError";
import authenticate from "@/middlewares/authenticate";
import { 
  loginValidation, 
  refreshTokenValidation, 
  registerValidation, 
} from "@/middlewares/authValidation";


const router = Router();

router.post(
  "/signup",
  registerValidation,
  validationError,
  signup
);

router.post(
  "/signin",
  loginValidation,
  validationError,
  signin
);

router.post(
  "/signout",
  authenticate,
  signout,
)

router.post(
  "/refresh-token", 
  refreshTokenValidation,
  validationError,
  refreshToken,
);


export default router;
