import { Router } from "express";
import { bookController } from "./book.controller";

const bookRoute = Router();

bookRoute.post("/", bookController.createBook);
bookRoute.get("/", bookController.getBooks);
bookRoute.get("/:bookId", bookController.getBookById);
bookRoute.put("/:bookId", bookController.updateBook);
bookRoute.delete("/:bookId", bookController.deleteBookById);

export default bookRoute;
