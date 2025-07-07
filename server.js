import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectToDatabase } from "./database/db.js";
import adminRoutes from "./routes/admin-routes.js";
import authRouter from "./routes/auth-routes.js";

const app = express();

// Connect to database
connectToDatabase();

// Use cors to allow access
app.use(cors());

// Use json middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRoutes);

// Listen to port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("App is now listening on port 3000"));
