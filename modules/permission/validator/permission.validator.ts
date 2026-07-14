import {z} from "zod";


export const createPermissionSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),

    code: z.string().trim().min(2).max(100),

    module: z.string().trim().min(2).max(100),

    description: z.string().max(500).optional(),
  }),
});
export const updatePermissionSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100).optional(),

    code: z.string().trim().min(2).max(100).optional(),

    module: z.string().trim().min(2).max(100).optional(),

    description: z.string().max(500).optional(),

    status: z.enum([
      "ACTIVE",
      "INACTIVE",
      "DELETED",
    ]).optional(),
  }),
});



export const getPermissionSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export const deletePermissionSchema = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});