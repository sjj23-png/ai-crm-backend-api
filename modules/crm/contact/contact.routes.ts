import { Router } from "express";


import { authGuard } from "../../auth/guards/auth.guard";

import { validate } from "../../../shared/middleware/validate.middleware";

import { ContactController } from "./controllers/contact.controller";

import {
  createContactSchema,
} from "./validators/create-contact.validator";

import {
  updateContactSchema,
} from "./validators/update-contact.validator";

const router = Router();

const controller =
  new ContactController();

router.post(
  "/",
  authGuard,
  validate(createContactSchema),
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

router.get(
  "/company/:companyId",
  authGuard,
  controller.companyContacts
);

router.put(
  "/:id",
  authGuard,
  validate(updateContactSchema),
  controller.update
);

router.delete(
  "/:id",
  authGuard,
  controller.delete
);

export default router;