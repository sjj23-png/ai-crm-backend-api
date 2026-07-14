import { Router } from "express";

import { authGuard } from "../../../auth/guards/auth.guard";

import { validate } from "../../../../shared/middleware/validate.middleware";

import {
  createActivitySchema,
  updateActivitySchema,
} from "../validators/activity.validator";

import { ActivityController } from "../controllers/activity.controller";

const router =
  Router();

const controller =
  new ActivityController();

router.post(
  "/",
  authGuard,
  validate(createActivitySchema),
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
  validate(updateActivitySchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;