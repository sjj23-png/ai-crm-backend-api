import { Router } from "express";


import leadRoutes
  from "./routes/lead.routes";

const router =
  Router();

router.use(
  "/leads",
  leadRoutes
);

export default router;