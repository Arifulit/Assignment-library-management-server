/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Model, Schema, model } from "mongoose";
import { IBook, Genre, IBookMethods } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      enum: Object.values(Genre),
      required: [true, "Genre is required"],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Copies field is required"],
      min: [0, "Copies must be a non-negative number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id;

        delete ret.__v;
      },
    },
  }
);

// Instance method to update availability based on copies
bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

// const Book = model<IBook>("Book", bookSchema);
const Book = model<IBook, Model<IBook, {}, IBookMethods>>("Book", bookSchema);
export default Book;
