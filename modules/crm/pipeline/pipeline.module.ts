import { Router } from "express";


import pipelineRoutes
  from "./routes/pipeline.routes";

const router =
  Router();

router.use(
  "/pipelines",
  pipelineRoutes
);

export default router;