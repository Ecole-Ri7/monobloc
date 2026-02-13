import express from "express"
import {addBook, deleteBook, getUpdateBook, postUpdateBook} from "../controllers/bookController.js"
import { authguard } from "../services/authguard.js";
export const bookRouter = express.Router();
bookRouter.get("/", function(){})
bookRouter.post("/add", authguard, addBook)
bookRouter.post("/:id/delete", authguard, deleteBook)
bookRouter.get("/:id/update", authguard, getUpdateBook)
bookRouter.post("/:id/update", authguard, postUpdateBook)