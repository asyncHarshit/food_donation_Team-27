import express from 'express';
import dotenv from 'dotenv';
import { dbConfig } from './db/dbConfig.js';
import upload_Routes from './routes/upload_routes.js';
import doner_Routes from './routes/doner_routes.js';






dotenv.config();

const app = express();


// Connect to MongoDB
dbConfig();


app.use("/api/image",upload_Routes)

app.use("/api/donations", doner_Routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






