"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../../shared/guards/auth.guard");
const tenant_middleware_1 = require("../tenant/middleware/tenant.middleware");
const organization_controller_1 = require("./controllers/organization.controller");
const router = (0, express_1.Router)();
const controller = new organization_controller_1.OrganizationController();
router.put("/users/:userId/organization", auth_guard_1.authGuard, tenant_middleware_1.tenantMiddleware, controller.assign);
router.get("/users/:userId/hierarchy", auth_guard_1.authGuard, tenant_middleware_1.tenantMiddleware, controller.hierarchy);
exports.default = router;
//# sourceMappingURL=organization.module.js.map