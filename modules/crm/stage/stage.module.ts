import { Router } from "express";

import { authGuard } from "../../auth/guards/auth.guard";
import { validate } from "../../../shared/middleware/validate.middleware";

import { StageController } from "./controllers/stage.controller";

import {
  createStageSchema,
  updateStageSchema,
} from "./validators/stage.validator";

const router = Router();

const controller = new StageController();

router.post(
  "/",
  authGuard,
  validate(createStageSchema),
  controller.create
);

router.get(
  "/pipeline/:pipelineId",
  authGuard,
  controller.getPipelineStages
);

router.get(
  "/:id",
  authGuard,
  controller.getById
);

router.put(
  "/:id",
  authGuard,
  validate(updateStageSchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;