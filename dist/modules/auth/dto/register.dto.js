"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = void 0;
const zod_1 = require("zod");
exports.RegisterSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(2, "Organization name is required"),
    code: zod_1.z.string().optional(),
    email: zod_1.z.string().email("Invalid organization email"),
    phone: zod_1.z.string().optional(),
    website: zod_1.z.string().optional(),
    ownerName: zod_1.z.string().min(2, "Owner name is required"),
    ownerEmail: zod_1.z.string().email("Invalid owner email"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: zod_1.z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});
//# sourceMappingURL=register.dto.js.map