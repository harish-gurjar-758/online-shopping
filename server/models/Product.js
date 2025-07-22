import mongoose from "mongoose";

//  Rating Schema
const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    star: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Product Schema || Main Schema 
const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ProductName: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        enum: ["electronics", "clothes", "shoes"],
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    images: {
        type: [String],
        validate: [arr => arr.length >= 1 && arr.length <= 8, 'Images must be between 1 and 8'],
        required: true,
    },
    ratings: [ratingSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
