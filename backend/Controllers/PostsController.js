const Posts = require("../Model/postsModel");

const getAllPosts = async (req, res) => {

    let posts;

    try{
        posts = await Posts.find();
    }catch (err){
        console.log(err);
    }

    //if posts not found 
    if(!posts){
        return res.status(404).json({message: "No posts found"});
    }

    //display all posts 
    return res.status(200).json(posts);
};

// create posts 

const insertPosts = async (req, res,next) => {

    const { title, description, category, location, disasterDate, isUpcoming  } = req.body;

         let createdPosts;

         try {
            createdPosts = new Posts({
                title, 
                description, 
                category, 
                location, 
                disasterDate, 
                isUpcoming
            });
            await createdPosts.save();
        }catch (error)
        {
            console.log(error);
        }

            //if post not created
            if(!createdPosts){
                return res.status(404).send({message: "Posts not created"});
            }

   

    return res.status(200).send({message: "Posts created successfully"});


};
//Get post by ID
const getPosts = async (req, res ,next) => {

    const id = req.params.id;

    let disaster;

    try {
        posts = await Posts.findById(id);
    }catch (err){
        console.log(err);
    }
    
    //if posts not available 
    if(!posts){
        return res.status(404).send({message: "Posts not found"});
    }

    return res.status(200).json({posts});
}

//Update posts

const updatePosts = async (req, res, next) => {

    const { title, description, category, location, disasterDate, isUpcoming } = req.body;

    const id = req.params.id;

    let posts;

    try {
        posts = await Posts.findByIdAndUpdate(id,
            {
                title, 
                description, 
                category, 
                location, 
                disasterDate, 
                isUpcoming 
            }
        );
        posts = await posts.save();

       
    }catch (err){
        console.log(err);
    }

    if(!posts){
        return res.status(404).send({message: "Unable to update Posts"});
    }
    

    return res.status(200).send({message: "Posts updated successfully"});
};

//Delete posts

const deletePosts = async (req, res, next) => {
    
    const id = req.params.id;

    let posts;

    try {
        posts = await Posts.findByIdAndDelete(id);
    }catch (err){
        console.log(err);
    }

    if(!posts){
        return res.status(404).send({message: "Unable to delete post"});
    }

    return res.status(200).send({message: "Post deleted successfully"});
};

//handle likes 
const handleLike = async (req, res) => {
    const { postId } = req.params; 
    const { userId } = req.body; 
  
    try {
      const post = await Posts.findById(postId);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.likes.includes(userId)) {
        return res.status(400).json({ message: "You already liked this post" });
      }
  
      post.likes.push(userId);
      await post.save(); 
  
      return res.status(200).json(post); 
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  };

  //handle comments
  const handleComment = async (req, res) => {
    const { postId } = req.params; 
    const { userId, text } = req.body; 

    try {
        const post = await Posts.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = {
            user: userId,  
            text,
            createdAt: new Date().toISOString(),
        };

        post.comments.push(comment);

        await post.save();

        return res.status(200).json({
            message: "Comment added successfully", 
            post: post  
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};


exports.insertPosts = insertPosts;
exports.getAllPosts = getAllPosts;
exports.getPosts = getPosts;
exports.updatePosts = updatePosts;
exports.deletePosts = deletePosts;
exports.handleLike =handleLike;
exports.handleComment = handleComment;