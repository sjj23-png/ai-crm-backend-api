import { z } from "zod";


import {
  CreateNoteSchema
} from "./create-note.dto";

export const UpdateNoteSchema =
  CreateNoteSchema.partial();

export type UpdateNoteDto =
  z.infer<typeof UpdateNoteSchema>;