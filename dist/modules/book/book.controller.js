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
exports.bookController = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const mongoose_1 = __importDefault(require("mongoose"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield book_model_1.default.create(req.body);
        res.send({
            success: true,
            message: "book created successfully",
            data,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            //  Handle schema validation error
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                error,
            });
        }
        // Handle other errors
        return res.status(500).json({
            message: "Failed to create book",
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query;
        // Build query object for filtering
        const query = {};
        if (filter) {
            query.genre = filter; // filter by genre
        }
        // Convert limit and sort
        const sortOrder = sort === "desc" ? -1 : 1;
        const resultLimit = parseInt(limit, 10);
        const data = yield book_model_1.default.find(query)
            .sort({ [sortBy]: sortOrder })
            .limit(resultLimit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get books",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findById(bookId);
        res.send({
            success: true,
            message: "book fetched successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to get book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findByIdAndUpdate(bookId, req.body, {
            new: true,
            runValidators: true,
        });
        res.send({
            success: true,
            message: "book updated successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to get book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findByIdAndDelete(bookId);
        res.send({
            success: true,
            message: "book delete successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to delete book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.bookController = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBookById,
};
