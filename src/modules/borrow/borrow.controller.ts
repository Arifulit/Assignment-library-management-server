/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { catchAsync } from "../../utils/catchAsync";
import Borrow from "./borrow.model";
import Book from "../book/book.model";


// ✅ Create a new borrow record

const createBorrow = catchAsync(async (req: Request, res: Response) => {
  // console.log("Request Body:", req.body);

  
  const bookId = req.body.bookId || req.body.book;

  if (!bookId) {
    return res.status(400).json({ success: false, message: "Book ID is required" });
  }

  const { quantity, dueDate } = req.body;

  const borrow = await Borrow.create({
    book: bookId,
    quantity,
    dueDate,
  });

  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: borrow,
  });
});


// Get borrow record by ID
const getBorrowById = catchAsync(async (req: Request, res: Response) => {
  const { borrowId } = req.params;


  const borrow = await Borrow.findById(borrowId).populate("book");

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
});

// ✅ Get borrow record(s) by book ID
const getBorrowByBookId = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const borrows = await Borrow.find({ book: bookId }).populate("book");

  if (!borrows.length) {
    return res.status(404).json({
      success: false,
      message: "No borrow records found for this book",
    });
  }

  res.status(200).json({
    success: true,
    message: "Borrow records retrieved successfully",
    data: borrows,
  });
});



// ✅ Borrow summary: Total borrow count per book
const getBorrowSummary = catchAsync(async (req: Request, res: Response) => {
  const summary = await Borrow.aggregate([
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
});


export const borrowController = {
  createBorrow,
  getBorrowSummary,
  getBorrowById,
  getBorrowByBookId
};
