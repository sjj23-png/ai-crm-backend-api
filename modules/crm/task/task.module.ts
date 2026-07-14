import { Router } from "express";

import taskRoutes
from "./routes/task.routes";

const router =
Router();

router.use(
"/tasks",
taskRoutes
);

export default router;