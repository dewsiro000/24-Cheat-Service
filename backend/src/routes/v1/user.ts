import { Router } from "express";

/*middlewares*/
import authenticate from "@/middlewares/authenticate";
import authorize from "@/middlewares/authorize";

/*Controllers*/
import {
  getCurrentUser,
  getAnswers,
} from "@/controllers/v1/user/get_current_user";

const router = Router();

router.get("/current", authenticate, authorize("user"), getCurrentUser);

router.get("/get-answers", authenticate, authorize("user"), getAnswers);

export default router;
