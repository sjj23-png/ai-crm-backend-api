"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePipelineSchema = exports.createPipelineSchema = void 0;
const zod_1 = require("zod");
const create_pipeline_dto_1 = require("../dto/create-pipeline.dto");
const update_pipeline_dto_1 = require("../dto/update-pipeline.dto");
exports.createPipelineSchema = zod_1.z.object({
    body: create_pipeline_dto_1.CreatePipelineSchema,
});
exports.updatePipelineSchema = zod_1.z.object({
    body: update_pipeline_dto_1.UpdatePipelineSchema,
});
//# sourceMappingURL=pipeline.validator.js.map