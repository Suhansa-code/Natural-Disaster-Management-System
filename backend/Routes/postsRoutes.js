import express from "express";
import {
  getAllPosts,
  insertPosts,
  getPosts,
  updatePosts,
  deletePosts,
  handleLike,
  handleComment,
} from "../Controllers/PostsController.js";

const postsrouter = express.Router();

postsrouter.get("/", getAllPosts);
postsrouter.post("/", insertPosts);
postsrouter.get("/:id", getPosts);
postsrouter.put("/:id", updatePosts);
postsrouter.delete("/:id", deletePosts);
postsrouter.post("/:postId/like", handleLike);
postsrouter.post("/posts/:postId/comment", handleComment);

export default postsrouter;
