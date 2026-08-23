import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import { globalErrorHandler } from "../../../shared/errors/global-error.handler";

import path from "node:path";
import routes from "./routes";

const app = express();

// ======================
// CORE MIDDLEWARES
// ======================
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-tenant-id"],
  })
);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);
app.use(cookieParser());
// ======================
// BASE ROUTES
// ======================
app.use("/api", routes);

// ======================
// HEALTH CHECK
// ======================
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI CRM API is running"
  });
});

// ======================
// GLOBAL ERROR HANDLER
// ======================
app.use(globalErrorHandler);

export default app;