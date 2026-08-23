"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContactSchema = void 0;
const zod_1 = require("zod");
exports.CreateContactSchema = zod_1.z.object({
    tenantId: zod_1.z.string().optional(),
    companyId: zod_1.z.string().cuid(),
    ownerId: zod_1.z.string().cuid().optional(),
    teamId: zod_1.z.string().cuid().optional(),
    firstName: zod_1.z.string().trim().min(2).max(100),
    lastName: zod_1.z.string().trim().max(100).optional(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().optional(),
    designation: zod_1.z.string().optional(),
    department: zod_1.z.string().optional(),
    source: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    postalCode: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
//# sourceMappingURL=create-contact.dto.js.map