"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../../../auth/guards/auth.guard");
const validate_middleware_1 = require("../../../../shared/middleware/validate.middleware");
const lead_validator_1 = require("../validators/lead.validator");
const lead_controller_1 = require("../controllers/lead.controller");
const router = (0, express_1.Router)();
const controller = new lead_controller_1.LeadController();
router.post("/", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(lead_validator_1.createLeadSchema), controller.create);
router.get("/", auth_guard_1.authGuard, controller.getAll);
router.get("/:id", auth_guard_1.authGuard, controller.getById);
router.put("/:id", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(lead_validator_1.updateLeadSchema), controller.update);
router.delete("/:id", auth_guard_1.authGuard, controller.delete);
exports.default = router;
//# sourceMappingURL=lead.routes.js.map