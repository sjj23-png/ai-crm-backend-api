"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../auth/guards/auth.guard");
const permission_controller_1 = require("./controller/permission.controller");
const validate_middleware_1 = require("../../shared/middleware/validate.middleware");
const permission_validator_1 = require("./validator/permission.validator");
const router = (0, express_1.Router)();
const controller = new permission_controller_1.PermissionController();
router.post("/", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(permission_validator_1.createPermissionSchema), controller.create);
router.get("/", auth_guard_1.authGuard, controller.getAll);
router.get("/:id", auth_guard_1.authGuard, controller.getById);
router.put("/:id", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(permission_validator_1.updatePermissionSchema), controller.update);
router.delete("/:id", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(permission_validator_1.deletePermissionSchema), controller.delete);
exports.default = router;
//# sourceMappingURL=permission.routes.js.map