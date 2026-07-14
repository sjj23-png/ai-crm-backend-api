import { Router } from "express";


import { authGuard } from "../auth/guards/auth.guard";

import { PermissionController } from "./controller/permission.controller";
import { validate } from "../../shared/middleware/validate.middleware";
import { createPermissionSchema,updatePermissionSchema,getPermissionSchema,deletePermissionSchema } from "./validator/permission.validator";
const router = Router();

const controller = new PermissionController();

router.post(
  "/",
  authGuard,
  validate(createPermissionSchema),
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
  validate(updatePermissionSchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  validate(deletePermissionSchema),
  controller.delete
);

export default router;