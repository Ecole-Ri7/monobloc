import express from "express"
import {addBook} from "../controllers/bookController.js"
import { authguard } from "../services/authguard.js";
export const bookRouter = express.Router();
bookRouter.get("/", function(){})
bookRouter.post("/add", authguard, addBook)