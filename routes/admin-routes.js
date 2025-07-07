import express from "express";
import { postNewProject } from "../controllers/admin-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import multerMiddleware from "../middlewares/upload-middleware.js";

const adminRouter = express.Router();

adminRouter.post(
  "/projects",
  authMiddleware,
  multerMiddleware.single("image"),
  postNewProject
);

export default adminRouter;
