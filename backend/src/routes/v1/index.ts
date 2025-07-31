import { Router } from "express";
const router = Router();

import authRoutes from "@/routes/v1/auth";
import userRoutes from "@/routes/v1/user"

router.use("/auth", authRoutes);
router.use("/users", userRoutes)

export default router;

