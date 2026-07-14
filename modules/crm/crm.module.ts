import { Router } from "express";
import { authGuard } from "../auth/guards/auth.guard";

import contactRoutes from "./contact/contact.module";

const router = Router();



import { LeadController } from "./lead/controllers/lead.controller";
router.use(
  "/contacts",
  contactRoutes
);
const lead =
new LeadController();

router.post(
"/leads",
authGuard,
lead.create
);

router.get(
"/leads",
authGuard,
lead.getAll
);

router.get(
"/leads/:id",
authGuard,
lead.getById
);
import { PipelineController } from "./pipeline/controllers/pipeline.controller";

const pipeline =
new PipelineController();

router.post(
"/pipelines",
authGuard,
pipeline.create
);

router.get(
"/pipelines",
authGuard,
pipeline.getAll
);
import pipelineRoutes from "./pipeline/pipeline.module";
router.use(
  "/crm",
  pipelineRoutes
);




import { StageController } from "./stage/controllers/stage.controller";

const stage =
new StageController();

router.post(
"/stages",
authGuard,
stage.create
);

router.get(
"/pipelines/:pipelineId/stages",
authGuard,
stage.getPipelineStages
);










import tagRoutes from "./tag/tag.module";

router.use(
  "/crm",
  tagRoutes
);
import noteRoutes from "./note/note.module";

router.use(
  "/crm",
  noteRoutes
);
import taskRoutes from "./task/task.module";

router.use(
  "/crm",
  taskRoutes
);
import activityRoutes from "./activity/activity.module";

router.use(
  "/crm",
  activityRoutes
);
import dealRoutes from "./deal/deal.module";

router.use(
  "/crm",
  dealRoutes
);
export default router;