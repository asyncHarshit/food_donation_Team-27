import cloudinary from "../config/cloudinary.js";

export const uploadPhoto = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const fileURI = `data:${req.file.mimetype};base64,${fileBase64}`;


    const result = await cloudinary.uploader.upload(fileURI, {
      folder: "uploads",
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};
