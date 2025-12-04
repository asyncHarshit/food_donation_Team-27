import express from 'express';
import dotenv from 'dotenv';
import { dbConfig } from './db/dbConfig.js';
import cookieParser from 'cookie-parser';
import upload_Routes from './routes/upload_routes.js';
import doner_Routes from './routes/doner_routes.js';
import authRouter from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';






dotenv.config();

const app = express();


// ---------------- Middleware ----------------
app.use(express.json());      // parse JSON bodies
app.use(cookieParser());      // parse cookies

// Connect to MongoDB
dbConfig();


app.use("/api/image",upload_Routes)

app.use("/api/donations", doner_Routes);

app.use('/api/auth', authRouter); // mount auth routes
app.use('/api/admin', adminRoutes); // mount admin routes


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});









