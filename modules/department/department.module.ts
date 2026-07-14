import { Router } from "express";

import { authGuard } from "../auth/guards/auth.guard";

import { validate } from "../../shared/middleware/validate.middleware";

import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "./validators/department.validator";

import { DepartmentController } from "./controllers/department.controller";

const router = Router();

const controller =
  new DepartmentController();

router.post(
  "/",
  authGuard,
  validate(createDepartmentSchema),
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
  validate(updateDepartmentSchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;