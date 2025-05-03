import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";

const router = express.Router();

// Setup multer for handling image uploads
const upload = multer({ dest: "uploads/" });

// Cloudinary image upload endpoint
router.post("/upload", upload.single("image"), async (req, res) => {
  console.log("File path:", req.file.path); // Log the file path for debugging
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).send("Error uploading image");
  }
});

router.post("/uploadfile", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    // Upload the file to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: "raw",
    });
    res.json({ url: result.secure_url });

    // const result = await cloudinary.v2.uploader.upload(req.file.path);
    // res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file." });
  }
});

export default router;
