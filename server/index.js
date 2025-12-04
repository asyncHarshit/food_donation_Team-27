import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { dbConfig } from './db/dbConfig.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();

const app = express();

// ---------------- Middleware ----------------
app.use(express.json());      // parse JSON bodies
app.use(cookieParser());      // parse cookies

// ---------------- Connect to MongoDB ----------------
dbConfig();

// ---------------- Routes ----------------
app.use('/api/auth', authRouter); // mount auth routes

// ---------------- Default route ----------------
app.get('/', (req, res) => {
    res.send('Food Donation & Pickup API is running');
});

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






