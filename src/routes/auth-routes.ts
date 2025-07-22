import express from "express";
import { loginUser } from "../controllers/auth-controller.js";

const authRouter = express.Router();

// Login route
authRouter.post("/login", loginUser);

export default authRouter;
