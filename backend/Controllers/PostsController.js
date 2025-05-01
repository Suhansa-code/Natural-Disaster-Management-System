import Posts from "../Models/postsModel.js";

export const getAllPosts = async (req, res) => {
  let posts;

  try {
    posts = await Posts.find();
  } catch (err) {
    console.log(err);
  }

  //if posts not found
  if (!posts) {
    return res.status(404).json({ message: "No posts found" });
  }

  //display all posts
  return res.status(200).json(posts);
};

// create posts

export const insertPosts = async (req, res, next) => {
  const {
    title,
    description,
    category,
    location,
    disasterDate,
    imageUrl,
    isUpcoming,
  } = req.body;

  let createdPosts;

  try {
    createdPosts = new Posts({
      title,
      description,
      category,
      location,
      disasterDate,
      imageUrl,
      isUpcoming,
    });
    await createdPosts.save();
  } catch (error) {
    console.log(error);
  }

  //if post not created
  if (!createdPosts) {
    return res.status(404).send({ message: "Posts not created" });
  }

  return res.status(200).send({ message: "Posts created successfully" });
};
//Get post by ID
export const getPosts = async (req, res, next) => {
  const id = req.params.id;

  let disaster;

  try {
    posts = await Posts.findById(id);
  } catch (err) {
    console.log(err);
  }

  //if posts not available
  if (!posts) {
    return res.status(404).send({ message: "Posts not found" });
  }

  return res.status(200).json({ posts });
};

//Update posts

export const updatePosts = async (req, res, next) => {
  const {
    title,
    description,
    category,
    location,
    disasterDate,
    imageUrl,
    isUpcoming,
  } = req.body;

  const id = req.params.id;

  let posts;

  try {
    posts = await Posts.findByIdAndUpdate(id, {
      title,
      description,
      category,
      location,
      disasterDate,
      imageUrl,
      isUpcoming,
    });
    posts = await posts.save();
  } catch (err) {
    console.log(err);
  }

  if (!posts) {
    return res.status(404).send({ message: "Unable to update Posts" });
  }

  return res.status(200).send({ message: "Posts updated successfully" });
};

//Delete posts

export const deletePosts = async (req, res, next) => {
  const id = req.params.id;

  let posts;

  try {
    posts = await Posts.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  if (!posts) {
    return res.status(404).send({ message: "Unable to delete post" });
  }

  return res.status(200).send({ message: "Post deleted successfully" });
};

//handle likes
export const handleLike = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // If already liked, remove the like
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // Otherwise, add the like
      post.likes.push(userId);
    }

    await post.save();

    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//handle comments
export const handleComment = async (req, res) => {
  const { postId } = req.params;
  const { userId, text } = req.body;

  try {
    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create new comment object
    const newComment = {
      user: userId,
      text,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    // Return updated post with comments
    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
