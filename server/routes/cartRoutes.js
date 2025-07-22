import express from "express";
import {
  addToCart,
  getCart,
  removeItemFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST - Add or update item in cart
router.post("/add", protect, addToCart);

// GET - Get cart
router.get("/", protect, getCart);

// DELETE - Remove specific item
router.delete("/remove/:productId", protect, removeItemFromCart);

// DELETE - Clear cart
router.delete("/clear", protect, clearCart);

export default router;
