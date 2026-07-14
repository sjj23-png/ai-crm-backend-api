import { z } from "zod";


import {
  CreateNoteSchema
} from "../dto/create-note.dto";

import {
  UpdateNoteSchema
} from "../dto/update-note.dto";

export const createNoteSchema =
  z.object({

    body:
      CreateNoteSchema

  });

export const updateNoteSchema =
  z.object({

    body:
      UpdateNoteSchema

  });