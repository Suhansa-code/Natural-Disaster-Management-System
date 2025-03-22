import React, { useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";
import Navigationbar from "../main-components/Navigationbar";

const formatDate = (date) => {
  const now = new Date();
  const postDate = new Date(date);
  const timeDiff = now - postDate;
  const days = Math.floor(timeDiff / (1000 * 3600 * 24));
  const hours = Math.floor(timeDiff / (1000 * 3600));
  const minutes = Math.floor(timeDiff / (1000 * 60));

  if (days === 0) {
    if (hours < 1) {
      return `${minutes} minutes ago`;
    }
    return `${hours} hours ago`;
  }
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
};

const PostView = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem("userId"); 

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts");
      if (response.ok) {
        const data = await response.json();

        const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPosts(sortedPosts);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); 

  const handleLike = async (postId, userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? updatedPost : post))
        );
      } else {
        console.error("Failed to update like.");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = (postId, comment) => {
    if (!comment) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, { user: currentUserName, text: comment, createdAt: new Date() }] }
          : post
      )
    );
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
    <Navigationbar />

    <div className="p-10 bg-gradient-to-r from-red-300 to-orange-300 rounded-lg shadow-lg">
      <h1 className="text-center text-4xl text-white font-bold uppercase mb-6">Explore Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <p className="text-center text-xl text-gray-500">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
              <img
                src={post.imageUrl}
                alt="Post"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{post.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <p className="text-gray-500">{post.location}</p>
                <p className="text-gray-500">
                  {new Date(post.createdAt).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                  })}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center">
                  <button 
                    onClick={() => handleLike(post._id, currentUserId)} 
                    className={`flex items-center space-x-2 ${post.likes.includes(currentUserId) ? 'text-blue-600' : 'text-gray-500'}`}
                  >
                    <ThumbsUp className="w-6 h-6" />
                    <span>{post.likes.length} Likes</span>
                  </button>
                </div>
                <span className={`text-sm font-semibold ${post.isUpcoming ? 'text-green-500' : 'text-red-500'}`}>
                  {post.isUpcoming ? "Upcoming" : "Ongoing"}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Comments</h3>
                <div className="mt-2">
                  {post.comments.length === 0 ? (
                    <p className="text-gray-500">No comments yet.</p>
                  ) : (
                    post.comments.map((comment, index) => (
                      <div key={index} className="border-b border-gray-200 py-2">
                        <p className="font-semibold text-gray-800">{comment.user}</p>
                        <p className="text-gray-600">{comment.text}</p>
                        <p className="text-sm text-gray-400">{formatDate(comment.createdAt)}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-4 flex items-center">
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-md w-full"
                    placeholder="Add a comment..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleAddComment(post._id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default PostView;
