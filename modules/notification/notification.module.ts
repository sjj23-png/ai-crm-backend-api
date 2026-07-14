import { Router } from "express";

import { authGuard } from "../auth/guards/auth.guard";

import { validate } from "../../shared/middleware/validate.middleware";

import {
  createNotificationSchema,
  updateNotificationSchema,
} from "./validators/notification.validator";

import { NotificationController } from "./controllers/notification.controller";

const router = Router();

const controller =
  new NotificationController();

router.post(
  "/",
  authGuard,
  validate(createNotificationSchema),
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
  validate(updateNotificationSchema),
  controller.update
);

router.patch(
  "/:id/read",
  authGuard,
  controller.markAsRead
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;