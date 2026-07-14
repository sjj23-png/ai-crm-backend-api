import { Router } from "express";

import { authGuard }
from "../../shared/guards/auth.guard";

import { validate }
from "../../shared/middleware/validate.middleware";

import { TenantController }
from "./controllers/tenant.controller";

import {
  createTenantSchema,
} from "./validators/create-tenant.validator";

import {
  updateTenantSchema,
} from "./validators/update-tenant.validator";

const router = Router();

const controller =
  new TenantController();

router.post(
  "/",
  authGuard,
  validate(createTenantSchema),
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
  validate(updateTenantSchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;