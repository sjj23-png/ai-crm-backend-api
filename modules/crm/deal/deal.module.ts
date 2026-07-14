import { Router } from "express";

import dealRoutes
  from "./routes/deal.routes";

const router =
  Router();

router.use(
  "/deals",
  dealRoutes
);

export default router;