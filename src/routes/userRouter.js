import express from "express"
import { home, getRegister, postRegister } from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.get("/", home);

userRouter.get("/register", getRegister)
userRouter.post("/register", postRegister)