import { Router } from "express";

import { authGuard } from "../auth/guards/auth.guard";

import { validate } from "../../shared/middleware/validate.middleware";

import {
  createCommunicationSchema,
  updateCommunicationSchema,
} from "./validators/communication.validator";

import { CommunicationController } from "./controllers/communication.controller";

const router = Router();

const controller =
  new CommunicationController();

router.post(
  "/",
  authGuard,
  validate(createCommunicationSchema),
  controller.create
);

router.get(
  "/",
  authGuard,
  controller.getAll
);

router.get(
  "/id/:id",
  authGuard,
  controller.getById
);

router.get(
  "/public/:publicId",
  authGuard,
  controller.getByPublicId
);

router.put(
  "/:id",
  authGuard,
  validate(updateCommunicationSchema),
  controller.update
);

router.patch(
  "/:id/sent",
  authGuard,
  controller.markSent
);

router.patch(
  "/:id/delivered",
  authGuard,
  controller.markDelivered
);

router.patch(
  "/:id/read",
  authGuard,
  controller.markRead
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;