import { Router } from "express";


import activityRoutes
  from "./routes/activity.routes";

const router =
  Router();

router.use(
  "/activities",
  activityRoutes
);

export default router;