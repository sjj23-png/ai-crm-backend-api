"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDealSchema = exports.createDealSchema = void 0;
const zod_1 = require("zod");
const create_deal_dto_1 = require("../dto/create-deal.dto");
const update_deal_dto_1 = require("../dto/update-deal.dto");
exports.createDealSchema = zod_1.z.object({
    body: create_deal_dto_1.CreateDealSchema,
});
exports.updateDealSchema = zod_1.z.object({
    body: update_deal_dto_1.UpdateDealSchema,
});
//# sourceMappingURL=deal.validator.js.map