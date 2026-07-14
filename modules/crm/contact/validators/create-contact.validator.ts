import {
  CreateContactSchema,
} from "../dto/create-contact.dto";

export const createContactSchema =
  CreateContactSchema;

























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