import { Router } from "express";
import { AuthController } from "./controllers/auth.controller";

import { authGuard } from "./guards/auth.guard";
const router = Router();
const controller = new AuthController();

router.post("/register", controller.register);
router.post("/login", controller.login);

router.get("/me", authGuard, controller.me);







router.post("/refresh-token", controller.refreshToken);

router.post("/logout", controller.logout);
export default router;