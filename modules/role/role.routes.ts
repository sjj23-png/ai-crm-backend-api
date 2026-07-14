import { Router } from "express";

import { authGuard } from "../../shared/guards/auth.guard";
import { validate } from "../../shared/middleware/validate.middleware";

import { RoleController } from "./controllers/role.controller";
import { RolePermissionController } from "./controllers/role-permission.controller";

import {
  createRoleSchema,
  updateRoleSchema,
  assignPermissionSchema,
} from "./validators/role.validator";

const router = Router();

const controller = new RoleController();
const permissionController = new RolePermissionController();

router.post(
  "/",
  authGuard,
  validate(createRoleSchema),
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
  validate(updateRoleSchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

router.post(
  "/assign-permissions",
  authGuard,
  validate(assignPermissionSchema),
  permissionController.assign
);

router.get(
  "/:roleId/permissions",
  authGuard,
  permissionController.getPermissions
);

router.delete(
  "/:roleId/permissions/:permissionId",
  authGuard,
  permissionController.remove
);

export default router;