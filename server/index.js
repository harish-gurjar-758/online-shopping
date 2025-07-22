// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import db from './config/db.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
db();

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);         // Register, Login
app.use('/api/user', userRoutes);         // User profile, update, delete
app.use('/api/products', productRoutes);  // Create, fetch, edit, delete products
// app.use('/api/orders', orderRoutes);      // Create, track, manage orders

// Server Start
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
