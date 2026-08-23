"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const validate_middleware_1 = require("../../../shared/middleware/validate.middleware");
const company_controller_1 = require("./controller/company.controller");
const company_validator_1 = require("./validators/company.validator");
const router = (0, express_1.Router)();
const controller = new company_controller_1.CompanyController();
router.post("/", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(company_validator_1.createCompanySchema), controller.create);
router.get("/", auth_guard_1.authGuard, controller.getAll);
router.get("/:id", auth_guard_1.authGuard, controller.getById);
router.put("/:id", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(company_validator_1.updateCompanySchema), controller.update);
router.delete("/:id", auth_guard_1.authGuard, controller.delete);
exports.default = router;
//# sourceMappingURL=company.routes.js.map