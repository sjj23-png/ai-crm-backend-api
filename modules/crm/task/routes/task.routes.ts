import { Router } from "express";


import { authGuard } from "../../../auth/guards/auth.guard";

import { validate } from "../../../../shared/middleware/validate.middleware";

import {
  createTaskSchema,
  updateTaskSchema
} from "../validators/task.validator";

import { TaskController } from "../controllers/task.controller";

const router =
  Router();

const controller =
  new TaskController();

router.post(
  "/",
  authGuard,
  validate(createTaskSchema),
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
  validate(updateTaskSchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;