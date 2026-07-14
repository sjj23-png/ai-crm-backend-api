import { Router } from "express";

import { authGuard } from "../../../auth/guards/auth.guard";

import { validate } from "../../../../shared/middleware/validate.middleware";

import {

  createLeadSchema,

  updateLeadSchema,

} from "../validators/lead.validator";

import { LeadController } from "../controllers/lead.controller";

const router =
  Router();

const controller =
  new LeadController();

router.post(
  "/",
  authGuard,
  validate(createLeadSchema),
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
  validate(updateLeadSchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;