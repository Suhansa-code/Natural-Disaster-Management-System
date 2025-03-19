import express from "express";
import Post from "../models/Post.js";
import multer from 'multer';
import path from 'path';
 import { verifyToken, verifyAdmin } from "../controllers/authMiddleware.js";
const router = express.Router();

// Multer setup for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save images in 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
  });
  
  const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only JPG, PNG, and JPEG allowed."), false);
    }
    cb(null, true);
  };
  
  const upload = multer({ storage, fileFilter });

// Create a new post (with optional image upload)
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
    try {
      const { title, description, category, location, disasterDate } = req.body;
  
      // Construct new post data
      const newPost = new Post({
        title,
        description,
        category,
        location,
        disasterDate,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null, // Save only if an image is uploaded
        createdBy: req.user.id, // Assuming user ID is extracted from token
      });
  
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get all posts
router.get("/", async (req, res) => {
    try {
      const posts = await Post.find().sort({ publishedDate: -1 }); // Sort posts by publishedDate
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router.put("/:id", verifyAdmin, upload.single('image'), async (req, res) => {
    try {
      const { title, description, category, location, disasterDate, isUpcoming } = req.body;
      let imagePath = null;
  
      // If a new image is uploaded, set the image path
      if (req.file) {
        imagePath = req.file.path;
      }
  
      const updatedPostData = {
        title,
        description,
        category,
        location,
        disasterDate,
        isUpcoming,
        image: imagePath, // Use imagePath from multer if an image was uploaded
      };
  
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedPostData, { new: true });
      res.json(updatedPost);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
// Delete a post (Admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Like a post
router.put("/:id/like", verifyToken, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
        post.likes.push(req.user.id);
    } else {
        post.likes = post.likes.filter(id => id !== req.user.id);
    }
    await post.save();
    res.json(post);
});

// Add comment
router.post("/:id/comment", verifyToken, async (req, res) => {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    post.comments.push({ user: req.user.id, text });
    await post.save();
    res.json(post);
});

export default router;
