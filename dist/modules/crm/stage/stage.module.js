"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const validate_middleware_1 = require("../../../shared/middleware/validate.middleware");
const stage_controller_1 = require("./controllers/stage.controller");
const stage_validator_1 = require("./validators/stage.validator");
const router = (0, express_1.Router)();
const controller = new stage_controller_1.StageController();
router.post("/", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(stage_validator_1.createStageSchema), controller.create);
router.get("/pipeline/:pipelineId", auth_guard_1.authGuard, controller.getPipelineStages);
router.get("/:id", auth_guard_1.authGuard, controller.getById);
router.put("/:id", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(stage_validator_1.updateStageSchema), controller.update);
router.delete("/:id", auth_guard_1.authGuard, controller.delete);
exports.default = router;
//# sourceMappingURL=stage.module.js.map