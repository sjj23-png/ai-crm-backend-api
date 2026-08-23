"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotificationSchema = exports.createNotificationSchema = void 0;
const zod_1 = require("zod");
exports.createNotificationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z
            .string()
            .min(1),
        title: zod_1.z
            .string()
            .trim()
            .min(2)
            .max(255),
        message: zod_1.z
            .string()
            .trim()
            .min(1)
            .max(5000),
        type: zod_1.z
            .string()
            .trim()
            .min(1)
            .max(100),
        channel: zod_1.z
            .string()
            .trim()
            .min(1)
            .max(100),
        status: zod_1.z
            .string()
            .optional(),
    }),
});
exports.updateNotificationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .trim()
            .min(2)
            .max(255)
            .optional(),
        message: zod_1.z
            .string()
            .trim()
            .max(5000)
            .optional(),
        type: zod_1.z
            .string()
            .trim()
            .max(100)
            .optional(),
        channel: zod_1.z
            .string()
            .trim()
            .max(100)
            .optional(),
        status: zod_1.z
            .string()
            .optional(),
        readAt: zod_1.z
            .coerce
            .date()
            .optional(),
    }),
});
//# sourceMappingURL=notification.validator.js.map