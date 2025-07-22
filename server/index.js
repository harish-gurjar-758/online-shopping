import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db';

// ---
import {authRouters} from './routes/authRoutes.js';


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
// app.use(cors());
app.use(cors({
    origin: '*', // Or restrict to your frontend IP
    credentials: true
}));
app.use(express.json({ limit: '10mb' })); // to handle large JSON payloads
app.use(cookieParser());


// Connect to MongoDB
db();

// API Routes
app.use('/api/auth', authRouters);

serverListen
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});