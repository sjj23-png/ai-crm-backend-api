import { Router } from "express";

import { authGuard } from "../auth/guards/auth.guard";

import { validate } from "../../shared/middleware/validate.middleware";

import {
    createDesignationSchema,
} from "./validators/designation.validator";

import { updateDesignationSchema } from "./validators/update-designation.validator";

import { DesignationController } from "./controllers/designation.controller";

const router = Router();

const controller =
    new DesignationController();

router.post(
    "/",
    authGuard,
    validate(createDesignationSchema),
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
    validate(updateDesignationSchema),
    controller.update
);

router.delete(
    "/:id",
    authGuard,
    controller.delete
);

export default router;