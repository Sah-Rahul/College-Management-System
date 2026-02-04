import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import appRoutes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => res.json({ ok: true }));

app.use("/api/v1", appRoutes);

app.use(errorHandler);

export default app;
