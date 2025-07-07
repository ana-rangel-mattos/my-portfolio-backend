import express from "express";
import { postNewProject } from "../controllers/admin-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
const adminRouter = express.Router();

adminRouter.post("/project", authMiddleware, postNewProject);

export default adminRouter;
