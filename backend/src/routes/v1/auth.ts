import { Router } from "express";

/* controllers */
import register from "@/controllers/v1/auth/register";
import login from "@/controllers/v1/auth/login";
import refreshToken from "@/controllers/v1/auth/refresh_token";
import logout from "@/controllers/v1/auth/logout";

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
  register
);

router.post(
  "/signin",
  loginValidation,
  validationError,
  login
);

router.post(
  "/signout",
  authenticate,
  logout,
)

router.post(
  "/refresh-token", 
  refreshTokenValidation,
  validationError,
  refreshToken,
);


export default router;
