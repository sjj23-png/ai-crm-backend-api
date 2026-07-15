import { Router } from "express";
import { AuthController } from "./controllers/auth.controller";

import { authGuard } from "../../shared/guards/auth.guard";
const router = Router();
const controller = new AuthController();
router.post("/register", controller.register);
router.post("/login", controller.login);

router.post("/logout", authGuard, controller.logout);

router.get("/me", authGuard, controller.me);

router.post("/refresh", controller.refreshToken);
// Future extensions
// router.post("/google", controller.googleLogin);

export default router;