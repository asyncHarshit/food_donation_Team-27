import express from "express";
import { uploadPhoto } from "../controllers/uploadController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/upload", upload.single("photo"), uploadPhoto);

export default router;
