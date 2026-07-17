import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address."),

  password: z
    .min(1, "Password is required."),

  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<
  typeof loginSchema
>;