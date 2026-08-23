"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompanySchema = void 0;
const zod_1 = require("zod");
exports.CreateCompanySchema = zod_1.z.object({
    tenantId: zod_1.z.string().optional(),
    teamId: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    ownerId: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    name: zod_1.z.string()
        .min(2)
        .max(200),
    industry: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    website: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    email: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    phone: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    address: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    city: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    state: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    country: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    postalCode: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    companySize: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    description: zod_1.z.string().optional().nullable().or(zod_1.z.literal(""))
});
//# sourceMappingURL=create-company.dto.js.map