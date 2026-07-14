import { Router } from "express";
import { authGuard } from "../../auth/guards/auth.guard";

import { TagController } from "./controllers/tag.controller";

const router = Router();

const controller = new TagController();

router.post(
  "/tags",
  authGuard,
  controller.create
);

router.get(
  "/tags",
  authGuard,
  controller.getAll
);

router.put(
  "/tags/:id",
  authGuard,
  controller.update
);

router.delete(
  "/tags/:id",
  authGuard,
  controller.delete
);

export default router;

/*POST   /crm/deals/:id/tags
DELETE /crm/deals/:id/tags/:tagId

POST   /crm/companies/:id/tags
DELETE /crm/companies/:id/tags/:tagId

POST   /crm/contacts/:id/tags
DELETE /crm/contacts/:id/tags/:tagId

POST   /crm/leads/:id/tags
DELETE /crm/leads/:id/tags/:tagId

POST   /crm/tasks/:id/tags
DELETE /crm/tasks/:id/tags/:tagId  */