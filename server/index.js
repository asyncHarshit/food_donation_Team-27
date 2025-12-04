import express from 'express';
import dotenv from 'dotenv';
import { dbConfig } from './db/dbConfig.js';
dotenv.config();

const app = express();


// Connect to MongoDB
dbConfig();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






