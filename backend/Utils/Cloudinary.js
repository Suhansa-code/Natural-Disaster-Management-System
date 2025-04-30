import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";

const router = express.Router();

// Setup multer for handling image uploads
const upload = multer({ dest: "uploads/" });

// Cloudinary image upload endpoint
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).send("Error uploading image");
  }
});

export default router;
