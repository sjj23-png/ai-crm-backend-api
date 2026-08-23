"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateActivitySchema = exports.createActivitySchema = void 0;
const zod_1 = require("zod");
const create_activity_dto_1 = require("../dto/create-activity.dto");
const update_activity_dto_1 = require("../dto/update-activity.dto");
exports.createActivitySchema = zod_1.z.object({
    body: create_activity_dto_1.CreateActivitySchema
});
exports.updateActivitySchema = zod_1.z.object({
    body: update_activity_dto_1.UpdateActivitySchema
});
//# sourceMappingURL=activity.validator.js.map