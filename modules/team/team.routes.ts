import { Router } from "express";


import { authGuard } from "../../shared/guards/auth.guard";
import { validate } from "../../shared/middleware/validate.middleware";

import { TeamController } from "./controllers/team.controller";

import {
  createTeamSchema,
  updateTeamSchema,
} from "./validators/team.validator";

const router = Router();

const controller = new TeamController();

router.post(
  "/",
  authGuard,
  validate(createTeamSchema),
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
  validate(updateTeamSchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;