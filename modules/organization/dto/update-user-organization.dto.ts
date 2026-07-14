import { z } from "zod";


export const UpdateUserOrganizationSchema = z.object({

  departmentId: z.string().cuid(),

  teamId: z.string().cuid(),

  designationId: z.string().cuid(),

  managerId: z.string().cuid().optional()

});

export type UpdateUserOrganizationDto =
z.infer<typeof UpdateUserOrganizationSchema>;