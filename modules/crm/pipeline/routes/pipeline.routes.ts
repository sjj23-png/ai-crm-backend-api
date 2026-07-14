import { Router } from "express";


import { authGuard } from "../../../auth/guards/auth.guard";

import { validate } from "../../../../shared/middleware/validate.middleware";

import {
  createPipelineSchema,
  updatePipelineSchema,
} from "../validators/pipeline.validator";

import { PipelineController } from "../controllers/pipeline.controller";

const router =
  Router();

const controller =
  new PipelineController();

router.post(
  "/",
  authGuard,
  validate(createPipelineSchema),
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
  validate(updatePipelineSchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;