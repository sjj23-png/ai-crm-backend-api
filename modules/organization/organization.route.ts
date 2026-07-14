import { Router } from "express";

import { authGuard } from "../../shared/guards/auth.guard";
import { tenantMiddleware } from "../tenant/middleware/tenant.middleware";

import { validate } from "../../shared/middleware/validate.middleware";

import { OrganizationController } from "./controllers/organization.controller";

import {
  createOrganizationSchema,
} from "./validators/create-organization.validator";

import {
  updateOrganizationSchema,
} from "./validators/update-organization.validator";

const router = Router();

const controller =
  new OrganizationController();

router.post(
  "/",
  authGuard,
  tenantMiddleware,
  validate(createOrganizationSchema),
  controller.create
);

router.get(
  "/",
  authGuard,
  tenantMiddleware,
  controller.getAll
);

router.get(
  "/:id",
  authGuard,
  tenantMiddleware,
  controller.getById
);

router.put(
  "/:id",
  authGuard,
  tenantMiddleware,
  validate(updateOrganizationSchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  tenantMiddleware,
  controller.delete
);

export default router;