"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_middleware_1 = require("../storage/middleware/upload.middleware");
const auth_guard_1 = require("../../shared/guards/auth.guard");
const validate_middleware_1 = require("../../shared/middleware/validate.middleware");
const tenant_controller_1 = require("./controllers/tenant.controller");
const update_tenant_validator_1 = require("./validators/update-tenant.validator");
const router = (0, express_1.Router)();
const controller = new tenant_controller_1.TenantController();
router.post("/register", upload_middleware_1.uploadTenantLogo.single("logo"), controller.create);
router.get("/", auth_guard_1.authGuard, controller.getAll);
router.get("/:id", auth_guard_1.authGuard, controller.getById);
router.put("/:id", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(update_tenant_validator_1.updateTenantSchema), controller.update);
router.delete("/:id", auth_guard_1.authGuard, controller.delete);
exports.default = router;
//# sourceMappingURL=tenant.routes.js.map