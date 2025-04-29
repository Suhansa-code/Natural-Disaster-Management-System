import React, { useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";
import Navigationbar from "../main-components/Navigationbar";
import Footer from "../main-components/footer";

const formatDate = (date) => {
  const now = new Date();
  const postDate = new Date(date);
  const timeDiff = now - postDate;
  const days = Math.floor(timeDiff / (1000 * 3600 * 24));
  const hours = Math.floor(timeDiff / (1000 * 3600));
  const minutes = Math.floor(timeDiff / (1000 * 60));

  if (days === 0) {
    if (hours < 1) return `${minutes} minutes ago`;
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
        setPosts(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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

  return (
    <>
      <Navigationbar />
      <div className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-200 p-10">
        <h1 className="text-center text-5xl font-bold text-black uppercase mb-8">Explore Posts</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length === 0 ? (
              <p className="text-center text-xl text-white">No posts available.</p>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="backdrop-blur-xl bg-black/50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                  <img src={post.imageUrl} alt="Post" className="w-full h-56 object-cover rounded-xl" />
                  
                  <div className="mt-4">
                    <h2 className="text-white text-2xl font-semibold">{post.title}</h2>
                    <p className="text-white/80 mt-2">{post.description}</p>
                    
                    <div className="flex justify-between items-center mt-3 text-white/60 text-sm">
                      <p>{post.location}</p>
                      <p>{formatDate(post.createdAt)}</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <button 
                        onClick={() => handleLike(post._id, currentUserId)}
                        className={`flex items-center space-x-2 ${post.likes.includes(currentUserId) ? 'text-blue-400' : 'text-white/70'} hover:text-blue-500 transition`}
                      >
                        <ThumbsUp className="w-6 h-6" />
                        <span>{post.likes.length} Likes</span>
                      </button>
                         <span className={`text-sm font-bold ${post.isUpcoming ? 'text-green-400' : 'text-red-400'}`}>
                          {post.isUpcoming ? "Upcoming" : "Ongoing"}
                         </span>
                          {post.isUpcoming && post.disasterDate && new Date(post.disasterDate) > new Date() && (
                        <div className="text-sm text-red-400 mt-2">
                          <strong>Disaster Date:</strong> {new Date(post.disasterDate).toLocaleDateString()}
                        </div>
                        )}
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-white">Comments</h3>
                      <div className="mt-2 space-y-3">
                        {post.comments.length === 0 ? (
                          <p className="text-white/60">No comments yet.</p>
                        ) : (
                          post.comments.map((comment, index) => (
                            <div key={index} className="bg-white/20 p-3 rounded-lg">
                              <p className="text-white font-semibold">{comment.user}</p>
                              <p className="text-white/70">{comment.text}</p>
                              <p className="text-xs text-white/50">{formatDate(comment.createdAt)}</p>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="mt-4">
                        <input
                          type="text"
                          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
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
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default PostView;
