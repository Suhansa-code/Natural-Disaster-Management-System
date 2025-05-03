import express from "express";
import {
  getAllPosts,
  insertPosts,
  getPosts,
  updatePosts,
  deletePosts,
  handleLike,
  handleComment,
  approvePost,
  getPostsByStatus,
  rejectPost,
} from "../Controllers/PostsController.js";

const postsrouter = express.Router();

postsrouter.get("/", getAllPosts);
postsrouter.post("/", insertPosts);
postsrouter.get("/:id", getPosts);
postsrouter.put("/:id", updatePosts);
postsrouter.delete("/:id", deletePosts);
postsrouter.post("/:postId/like", handleLike);
postsrouter.post("/posts/:postId/comment", handleComment);
postsrouter.get("/status", getPostsByStatus);
postsrouter.put("/:id/approve", approvePost);
postsrouter.put("/:id/reject", rejectPost);
postsrouter.get("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post.comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    return res.status(500).json({ message: "Server error" });
  }
});
export default postsrouter;
