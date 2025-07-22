import Rating from "../models/Rating.js";
import Product from "../models/Product.js"; // Optional if linked to products

// Create or update rating
export const createOrUpdateRating = async (req, res) => {
  try {
    const { star, review, productId } = req.body;

    // Check for existing rating from same user (optional: per product)
    const existing = await Rating.findOne({
      userId: req.user._id,
      ...(productId && { productId }),
    });

    if (existing) {
      existing.star = star;
      existing.review = review;
      await existing.save();
      return res.status(200).json({ success: true, message: "Rating updated", rating: existing });
    }

    const rating = new Rating({
      userId: req.user._id,
      star,
      review,
      ...(productId && { productId }),
    });

    await rating.save();
    res.status(201).json({ success: true, message: "Rating added", rating });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create rating" });
  }
};

// Get all ratings (optionally filter by product)
export const getAllRatings = async (req, res) => {
  try {
    const { productId } = req.query;
    const filter = productId ? { productId } : {};

    const ratings = await Rating.find(filter)
      .populate("userId", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, ratings });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch ratings" });
  }
};

// Delete a rating
export const deleteRating = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);

    if (!rating) return res.status(404).json({ success: false, error: "Rating not found" });
    if (!rating.userId.equals(req.user._id)) return res.status(403).json({ success: false, error: "Unauthorized" });

    await rating.remove();
    res.status(200).json({ success: true, message: "Rating deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete rating" });
  }
};
