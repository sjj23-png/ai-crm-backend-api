"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_guard_1 = require("./guards/auth.guard");
const router = (0, express_1.Router)();
const controller = new auth_controller_1.AuthController();
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", auth_guard_1.authGuard, controller.me);
router.post("/refresh-token", controller.refreshToken);
router.post("/logout", controller.logout);
exports.default = router;
//# sourceMappingURL=auth.module.js.map