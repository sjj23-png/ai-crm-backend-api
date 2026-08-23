"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../auth/guards/auth.guard");
const user_controller_1 = require("./controllers/user.controller");
const router = (0, express_1.Router)();
const controller = new user_controller_1.UserController();
router.post("/", auth_guard_1.authGuard, controller.create);
router.get("/", auth_guard_1.authGuard, controller.getAll);
router.get("/:id", auth_guard_1.authGuard, controller.getById);
router.delete("/:id", auth_guard_1.authGuard, controller.delete);
router.put("/:id", auth_guard_1.authGuard, controller.update);
exports.default = router;
//# sourceMappingURL=user.module.js.map