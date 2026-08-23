"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLeadSchema = void 0;
const zod_1 = require("zod");
exports.CreateLeadSchema = zod_1.z.object({
    tenantId: zod_1.z.string().optional(),
    ownerId: zod_1.z.string().cuid().optional(),
    teamId: zod_1.z.string().cuid().optional(),
    companyId: zod_1.z.string().cuid().optional(),
    contactId: zod_1.z.string().cuid().optional(),
    pipelineId: zod_1.z.string().cuid().optional(),
    stageId: zod_1.z.string().cuid().optional(),
    firstName: zod_1.z
        .string()
        .trim()
        .min(2)
        .max(100),
    lastName: zod_1.z
        .string()
        .trim()
        .max(100)
        .optional(),
    email: zod_1.z
        .string()
        .email(),
    phone: zod_1.z
        .string()
        .optional(),
    source: zod_1.z.enum([
        "WEBSITE",
        "REFERRAL",
        "LINKEDIN",
        "FACEBOOK",
        "GOOGLE_ADS",
        "COLD_CALL",
        "EMAIL_CAMPAIGN",
        "IMPORT",
        "API",
        "MANUAL",
        "OTHER"
    ]),
    estimatedValue: zod_1.z
        .number()
        .positive()
        .optional(),
    expectedCloseDate: zod_1.z
        .coerce
        .date()
        .optional(),
});
//# sourceMappingURL=create-lead.dto.js.map