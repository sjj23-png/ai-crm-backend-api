"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const validate_middleware_1 = require("../../../shared/middleware/validate.middleware");
const contact_controller_1 = require("./controllers/contact.controller");
const create_contact_validator_1 = require("./validators/create-contact.validator");
const update_contact_validator_1 = require("./validators/update-contact.validator");
const router = (0, express_1.Router)();
const controller = new contact_controller_1.ContactController();
router.post("/", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(create_contact_validator_1.createContactSchema), controller.create);
router.get("/", auth_guard_1.authGuard, controller.getAll);
router.get("/:id", auth_guard_1.authGuard, controller.getById);
router.get("/company/:companyId", auth_guard_1.authGuard, controller.companyContacts);
router.put("/:id", auth_guard_1.authGuard, (0, validate_middleware_1.validate)(update_contact_validator_1.updateContactSchema), controller.update);
router.delete("/:id", auth_guard_1.authGuard, controller.delete);
exports.default = router;
//# sourceMappingURL=contact.routes.js.map