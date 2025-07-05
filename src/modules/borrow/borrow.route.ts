import { Router } from "express";
import { borrowController } from "./borrow.controller";

const borrowRoute = Router();

borrowRoute.post("/", borrowController.createBorrow);

// ✅ Keep more specific route first
borrowRoute.get("/book/:bookId", borrowController.getBorrowByBookId);

// ✅ Then the generic param route
borrowRoute.get("/:borrowId", borrowController.getBorrowById);

borrowRoute.get("/", borrowController.getBorrowSummary);

export default borrowRoute;