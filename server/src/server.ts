import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
dotenv.config();

const PORT = process.env.PORT || 8000;
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🔥 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup failed:", err);
    process.exit(1);
  }
};

startServer();
