import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware";
import authRouter from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import teacherRoutes from "./routes/teacher.routes";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/admin",adminRoutes)
app.use("/api/v1/teacher",teacherRoutes)


app.use(errorMiddleware)

export default app;
