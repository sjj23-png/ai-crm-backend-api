import { Router } from "express";


import { authGuard } from "../../auth/guards/auth.guard";

import { validate } from "../../../shared/middleware/validate.middleware";

import { CompanyController } from "./controller/company.controller";

import {
  createCompanySchema,
  updateCompanySchema,
} from "./validators/company.validator";

const router = Router();

const controller =
  new CompanyController();

router.post(
  "/",
  authGuard,
  validate(createCompanySchema),
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
  validate(updateCompanySchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;