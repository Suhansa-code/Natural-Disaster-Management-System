const express = require("express");
const postsrouter = express.Router();

//Insert model

const Posts = require("../Model/postsModel");

//User controllers 

const PostsController = require("../Controllers/PostsController");

postsrouter.get("/",PostsController.getAllPosts);
postsrouter.post("/",PostsController.insertPosts);
postsrouter.get("/:id",PostsController.getPosts);
postsrouter.put("/:id",PostsController.updatePosts);
postsrouter.delete("/:id",PostsController.deletePosts);
postsrouter.post("/:postId/like", PostsController.handleLike);
postsrouter.post("/posts/:postId/comment", PostsController.handleComment);
module.exports = postsrouter;