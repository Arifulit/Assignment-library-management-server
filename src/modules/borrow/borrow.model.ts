/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { IBorrow } from "./borrow.interface";
import Book from "../book/book.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value: Date) => value > new Date(),
        message: "Due date must be in the future",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Middleware: Handle book stock logic before saving

borrowSchema.pre("save", async function (next) {
  const borrow = this;
  const book = await Book.findById(borrow.book);

  if (!book) return next(new Error("Book not found"));

  if (book.copies < borrow.quantity) {
    return next(new Error("Not enough copies available"));
  }

  book.copies -= borrow.quantity;

  // Update availability using instance method
  book.updateAvailability();

  await book.save();
  next();
});

const Borrow = model<IBorrow>("Borrow", borrowSchema);
export default Borrow;
