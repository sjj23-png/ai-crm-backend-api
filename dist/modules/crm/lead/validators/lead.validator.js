"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeadSchema = exports.createLeadSchema = void 0;
const zod_1 = require("zod");
const create_lead_dto_1 = require("../dto/create-lead.dto");
const update_lead_dto_1 = require("../dto/update-lead.dto");
exports.createLeadSchema = zod_1.z.object({
    body: create_lead_dto_1.CreateLeadSchema,
});
exports.updateLeadSchema = zod_1.z.object({
    body: update_lead_dto_1.UpdateLeadSchema,
});
//# sourceMappingURL=lead.validator.js.map