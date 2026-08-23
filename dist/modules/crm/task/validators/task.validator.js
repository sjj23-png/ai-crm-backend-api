"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
const create_task_dto_1 = require("../dto/create-task.dto");
const update_task_dto_1 = require("../dto/update-task.dto");
exports.createTaskSchema = zod_1.z.object({
    body: create_task_dto_1.CreateTaskSchema
});
exports.updateTaskSchema = zod_1.z.object({
    body: update_task_dto_1.UpdateTaskSchema
});
//# sourceMappingURL=task.validator.js.map