/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response} from "express";
import Book from "./book.model";
import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createBook: any = async (req: Request, res: Response) => {
  console.log("Received body:", req.body);  
  try {
    const data = await Book.create(req.body);
    res.send({
      success: true,
      message: "book created successfully",
      data,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        error,
      });
    }

    return res.status(500).json({
      message: "Failed to create book",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};



const getBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = "10",
    } = req.query;

    const query: Record<string, unknown> = {};
    if (filter) {
      query.genre = filter; // filter by genre
    }

    const sortOrder = sort === "desc" ? -1 : 1;
    const resultLimit = parseInt(limit as string, 10);

    const data = await Book.find(query)
      .sort({ [sortBy as string]: sortOrder })
      .limit(resultLimit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get books",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getBookById: any = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findById(bookId);
    res.send({
      success: true,
      message: "book fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to get book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updateBook: any = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
  // console.log("📦 Book Data:", req.body);

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
        error: `Provided ID '${bookId}' is not valid`,
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: `No book found with ID ${bookId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
  

};



const deleteBookById: any = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: `No book found with ID ${bookId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


export const bookController = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBookById,
};

// Create a router instance and define routes
// const router = Router();
// router.post("/", bookController.createBook);

// Export the router for use in your app
// export default router;
