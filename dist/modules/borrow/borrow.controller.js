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
const createBorrow = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, quantity, dueDate } = req.body;
    const borrow = yield borrow_model_1.default.create({ book, quantity, dueDate });
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
    });
}));
// Get Borrow Summary
const getBorrowSummary = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield borrow_model_1.default.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" },
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
                totalQuantity: 1,
                book: {
                    title: "$book.title",
                    isbn: "$book.isbn",
                },
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
};
