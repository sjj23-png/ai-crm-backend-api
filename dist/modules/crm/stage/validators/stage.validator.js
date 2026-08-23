"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStageSchema = exports.createStageSchema = void 0;
const zod_1 = require("zod");
const create_stage_dto_1 = require("../dto/create-stage.dto");
const update_stage_dto_1 = require("../dto/update-stage.dto");
exports.createStageSchema = zod_1.z.object({
    body: create_stage_dto_1.CreateStageSchema,
});
exports.updateStageSchema = zod_1.z.object({
    body: update_stage_dto_1.UpdateStageSchema,
});
//# sourceMappingURL=stage.validator.js.map