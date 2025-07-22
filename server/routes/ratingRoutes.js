import express from "express";
import {
  createOrUpdateRating,
  getAllRatings,
  deleteRating,
} from "../controllers/ratingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST/PUT - Create or update a rating
router.post("/", protect, createOrUpdateRating);

// GET - All ratings or filtered by product
router.get("/", getAllRatings);

// DELETE - Delete a rating by ID (owner only)
router.delete("/:id", protect, deleteRating);

export default router;
