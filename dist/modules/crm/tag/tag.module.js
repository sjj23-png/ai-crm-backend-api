"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const tag_controller_1 = require("./controllers/tag.controller");
const router = (0, express_1.Router)();
const controller = new tag_controller_1.TagController();
router.post("/tags", auth_guard_1.authGuard, controller.create);
router.get("/tags", auth_guard_1.authGuard, controller.getAll);
router.put("/tags/:id", auth_guard_1.authGuard, controller.update);
router.delete("/tags/:id", auth_guard_1.authGuard, controller.delete);
exports.default = router;
/*POST   /crm/deals/:id/tags
DELETE /crm/deals/:id/tags/:tagId

POST   /crm/companies/:id/tags
DELETE /crm/companies/:id/tags/:tagId

POST   /crm/contacts/:id/tags
DELETE /crm/contacts/:id/tags/:tagId

POST   /crm/leads/:id/tags
DELETE /crm/leads/:id/tags/:tagId

POST   /crm/tasks/:id/tags
DELETE /crm/tasks/:id/tags/:tagId  */ 
//# sourceMappingURL=tag.module.js.map