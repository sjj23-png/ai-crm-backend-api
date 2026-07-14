import { Router } from "express";
import { authGuard } from "../auth/guards/auth.guard";

import { UserController } from "./controllers/user.controller";

const router = Router();

const controller =
  new UserController();

router.post(
  "/",
  authGuard,
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

router.delete(
  "/:id",
  authGuard,
  controller.delete
);
router.put(

  "/:id",

  authGuard,

  controller.update

);
export default router;