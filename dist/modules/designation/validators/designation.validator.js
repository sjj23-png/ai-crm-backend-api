"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDesignationSchema = void 0;
const zod_1 = require("zod");
exports.createDesignationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters.")
            .max(100, "Name cannot exceed 100 characters."),
        description: zod_1.z
            .string()
            .trim()
            .max(500, "Description cannot exceed 500 characters.")
            .optional(),
    }),
});
//# sourceMappingURL=designation.validator.js.map