"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../auth/guards/auth.guard");
const validate_middleware_1 = require("../../shared/middleware/validate.middleware");
const notification_validator_1 = require("./validators/notification.validator");
const notification_controller_1 = require("./controllers/notification.controller");
const router = (0, express_1.Router)();
const controller = new notification_controller_1.NotificationController();
router.post("/", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(notification_validator_1.createNotificationSchema), controller.create);
router.get("/", auth_guard_1.authGuard, controller.getAll);
router.get("/:id", auth_guard_1.authGuard, controller.getById);
router.put("/:id", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(notification_validator_1.updateNotificationSchema), controller.update);
router.patch("/:id/read", auth_guard_1.authGuard, controller.markAsRead);
router.delete("/:id", auth_guard_1.authGuard, controller.delete);
exports.default = router;
//# sourceMappingURL=notification.module.js.map