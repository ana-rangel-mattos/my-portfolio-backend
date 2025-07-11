import express from "express";
import {
  deleteProjectById,
  fetchProjectsByUserId,
  postNewProject,
} from "../controllers/admin-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import multerMiddleware from "../middlewares/upload-middleware.js";

const adminRouter = express.Router();

adminRouter.post(
  "/projects",
  authMiddleware,
  multerMiddleware.single("image"),
  postNewProject
);

adminRouter.delete("/projects/:projectId", authMiddleware, deleteProjectById);

adminRouter.get("/projects/:userId", authMiddleware, fetchProjectsByUserId);

export default adminRouter;
