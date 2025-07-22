import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        star: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        review: {
            type: String,
            trim: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
