"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../../../auth/guards/auth.guard");
const validate_middleware_1 = require("../../../../shared/middleware/validate.middleware");
const pipeline_validator_1 = require("../validators/pipeline.validator");
const pipeline_controller_1 = require("../controllers/pipeline.controller");
const router = (0, express_1.Router)();
const controller = new pipeline_controller_1.PipelineController();
router.post("/", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(pipeline_validator_1.createPipelineSchema), controller.create);
router.get("/", auth_guard_1.authGuard, controller.getAll);
router.get("/:id", auth_guard_1.authGuard, controller.getById);
router.put("/:id", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(pipeline_validator_1.updatePipelineSchema), controller.update);
router.delete("/:id", auth_guard_1.authGuard, controller.delete);
exports.default = router;
//# sourceMappingURL=pipeline.routes.js.map