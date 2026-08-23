"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../../shared/guards/auth.guard");
const validate_middleware_1 = require("../../shared/middleware/validate.middleware");
const team_controller_1 = require("./controllers/team.controller");
const team_validator_1 = require("./validators/team.validator");
const router = (0, express_1.Router)();
const controller = new team_controller_1.TeamController();
router.post("/", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(team_validator_1.createTeamSchema), controller.create);
router.get("/", auth_guard_1.authGuard, controller.getAll);
router.get("/:id", auth_guard_1.authGuard, controller.getById);
router.put("/:id", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(team_validator_1.updateTeamSchema), controller.update);
router.delete("/:id", auth_guard_1.authGuard, controller.delete);
exports.default = router;
//# sourceMappingURL=team.routes.js.map