"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactSchema = void 0;
const create_contact_dto_1 = require("../dto/create-contact.dto");
exports.createContactSchema = create_contact_dto_1.CreateContactSchema;
// import { z } from "zod";
// export const createContactSchema = z.object({
//   companyId: z
//     .string()
//     .cuid()
//     .optional(),
//   firstName: z
//     .string()
//     .trim()
//     .min(2)
//     .max(100),
//   lastName: z
//     .string()
//     .trim()
//     .optional(),
//   email: z
//     .string()
//     .email(),
//   phone: z
//     .string()
//     .optional(),
//   designation: z
//     .string()
//     .optional(),
//   ownerId: z
//     .string()
//     .cuid(),
//   teamId: z
//     .string()
//     .cuid(),
// });
// export type CreateContactInput = z.infer<
//   typeof createContactSchema
// >;
//# sourceMappingURL=create-contact.validator.js.map