import { z } from "zod";


export const createRoleSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),

    code: z.string().trim().min(2).max(50),

    description: z.string().max(500).optional(),
  })
});

export const updateRoleSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100).optional(),

    code: z.string().trim().min(2).max(50).optional(),

    description: z.string().max(500).optional(),

    status: z.enum([
      "ACTIVE",
      "INACTIVE",
      "DELETED",
    ]).optional(),
  }),
});

export const assignPermissionSchema = z.object({
  body: z.object({
    roleId: z.string().cuid(),

    permissionIds: z.array(
      z.string().cuid()
    ).min(1),
  }),
});