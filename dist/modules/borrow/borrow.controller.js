"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const borrow_model_1 = __importDefault(require("./borrow.model"));
// ✅ Create borrow record
const createBorrow = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, quantity, dueDate } = req.body;
    const borrow = yield borrow_model_1.default.create({
        book: bookId,
        quantity,
        dueDate,
    });
    // console.log("Borrow created:", borrow);
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
    });
}));
// ✅ Get borrow record by ID
const getBorrowById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { borrowId } = req.params;
    const borrow = yield borrow_model_1.default.findById(borrowId).populate("book");
    if (!borrow) {
        return res.status(404).json({
            success: false,
            message: "Borrow record not found",
        });
    }
    res.status(200).json({
        success: true,
        message: "Borrow record retrieved successfully",
        data: borrow,
    });
}));
// ✅ Borrow summary: Total borrow count per book
const getBorrowSummary = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield borrow_model_1.default.aggregate([
        {
            $group: {
                _id: "$book",
                totalBorrowed: { $sum: "$quantity" },
            },
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "book",
            },
        },
        { $unwind: "$book" },
        {
            $project: {
                _id: 0,
                title: "$book.title",
                isbn: "$book.isbn",
                totalBorrowed: 1,
            },
        },
    ]);
    res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary,
    });
}));
exports.borrowController = {
    createBorrow,
    getBorrowSummary,
    getBorrowById,
};
