"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
const borrowRoute = (0, express_1.Router)();
borrowRoute.post("/", borrow_controller_1.borrowController.createBorrow);
// ✅ Keep more specific route first
borrowRoute.get("/book/:bookId", borrow_controller_1.borrowController.getBorrowByBookId);
// ✅ Then the generic param route
borrowRoute.get("/:borrowId", borrow_controller_1.borrowController.getBorrowById);
borrowRoute.get("/", borrow_controller_1.borrowController.getBorrowSummary);
exports.default = borrowRoute;
