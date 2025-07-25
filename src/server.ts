import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectToDatabase } from "./database/db.js";
import adminRouter from "./routes/admin-routes.js";
import authRouter from "./routes/auth-routes.js";

// Default env to development
const nodeEnv = process.env.NODE_ENV || "development";

const app = express();

// Connect to database
connectToDatabase(nodeEnv);

// Use cors to allow access
app.use(cors());

// Use json middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

// Listen to port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("App is now listening on port 3000"));
