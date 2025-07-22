import Product from '../models/Product.js';
import User from '../models/User.js'; // for validation (if needed)

// CREATE: Add new product
export const createProduct = async (req, res) => {
  try {
    const {
      sellerId,
      productName,
      category,
      price,
      description,
      stock,
      images,
    } = req.body;

    // Validation
    if (!sellerId || !productName || !category || !price || !description || !stock || !images) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Optional: Validate user exists
    const sellerExists = await User.findById(sellerId);
    if (!sellerExists) return res.status(404).json({ error: 'Seller not found' });

    const product = new Product({
      sellerId,
      productName,
      category,
      price,
      description,
      stock,
      images,
    });

    const saved = await product.save();
    res.status(201).json({ success: true, product: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
};

// GET ALL: List all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('sellerId', 'name email');
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get products', details: error.message });
  }
};

// GET ONE: Get product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate('sellerId', 'name email');
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product', details: error.message });
  }
};

// UPDATE: Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
};

// DELETE: Remove a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
};

// FILTER BY CATEGORY
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter products', details: error.message });
  }
};
