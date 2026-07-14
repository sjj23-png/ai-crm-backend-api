import { Router } from "express";

import { authGuard } from "../../../auth/guards/auth.guard";

import { validate } from "../../../../shared/middleware/validate.middleware";

import {

  createDealSchema,

  updateDealSchema,

} from "../validators/deal.validator";

import { DealController } from "../controllers/deal.controller";

const router =
  Router();

const controller =
  new DealController();

router.post(
  "/",
  authGuard,
  validate(createDealSchema),
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
  validate(updateDealSchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;