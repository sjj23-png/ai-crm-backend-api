import { Router } from "express";


import { authGuard } from "../../../auth/guards/auth.guard";

import { validate } from "../../../../shared/middleware/validate.middleware";

import {
  createNoteSchema,
  updateNoteSchema
} from "../validators/note.validator";

import { NoteController } from "../controllers/note.controller";

const router =
  Router();

const controller =
  new NoteController();

router.post(
  "/",
  authGuard,
  validate(createNoteSchema),
  controller.create
);

router.get(
  "/",
  authGuard,
  controller.getAll
);

router.get(
  "/:id",
  authGuard,
  controller.getById
);

router.put(
  "/:id",
  authGuard,
  validate(updateNoteSchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;