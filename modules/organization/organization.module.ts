import { Router } from "express";
import { authGuard } from "../../shared/guards/auth.guard";
import { tenantMiddleware } from "../tenant/middleware/tenant.middleware";
import { OrganizationController } from "./controllers/organization.controller";

const router = Router();
const controller = new OrganizationController();

router.put(
  "/users/:userId/organization",
  authGuard,
  tenantMiddleware,
  controller.assign
);

router.get(
  "/users/:userId/hierarchy",
  authGuard,
  tenantMiddleware,
  controller.hierarchy
);

export default router;