import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectToDatabase } from "./database/db.js";
import adminRouter from "./routes/admin-router.js";

const app = express();

// Connect to database
connectToDatabase();

app.use(cors());

// Routes
app.use("/api/admin/", adminRouter);

// Listen to port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("App is now listening on port 3000"));
