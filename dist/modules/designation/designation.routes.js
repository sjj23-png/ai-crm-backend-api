"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../auth/guards/auth.guard");
const validate_middleware_1 = require("../../shared/middleware/validate.middleware");
const designation_validator_1 = require("./validators/designation.validator");
const update_designation_validator_1 = require("./validators/update-designation.validator");
const designation_controller_1 = require("./controllers/designation.controller");
const router = (0, express_1.Router)();
const controller = new designation_controller_1.DesignationController();
router.post("/", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(designation_validator_1.createDesignationSchema), controller.create);
router.get("/", auth_guard_1.authGuard, controller.getAll);
router.get("/:id", auth_guard_1.authGuard, controller.getById);
router.put("/:id", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(update_designation_validator_1.updateDesignationSchema), controller.update);
router.delete("/:id", auth_guard_1.authGuard, controller.delete);
exports.default = router;
//# sourceMappingURL=designation.routes.js.map