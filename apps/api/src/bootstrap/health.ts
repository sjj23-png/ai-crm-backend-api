import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: "AI CRM Backend"
  });
});

export default router;