"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_guard_1 = require("../../shared/guards/auth.guard");
const upload_middleware_1 = require("../storage/middleware/upload.middleware");
const router = (0, express_1.Router)();
const controller = new auth_controller_1.AuthController();
router.post("/register", upload_middleware_1.uploadTenantLogo.single("logo"), controller.register);
router.post("/login", controller.login);
router.post("/logout", auth_guard_1.authGuard, controller.logout);
router.get("/me", auth_guard_1.authGuard, controller.me);
router.post("/refresh", controller.refreshToken);
// Future extensions
// router.post("/google", controller.googleLogin);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map