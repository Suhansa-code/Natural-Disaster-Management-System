import React, { useEffect, useState } from "react";

// Function to format the comment creation time
const formatDate = (date) => {
  const now = new Date();
  const timeDiff = now - new Date(date);
  const days = Math.floor(timeDiff / (1000 * 3600 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
};

const PostView = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Assuming the current user's name is stored in localStorage
  const currentUserName = localStorage.getItem('userName'); // Replace with actual method to get user name

  // Fetch posts from the backend API
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
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

  const handleLike = (postId, userId) => {
    // Toggle like logic, based on whether the user has liked this post
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: post.likes.includes(userId)
                ? post.likes.filter((like) => like !== userId)
                : [...post.likes, userId],
            }
          : post
      )
    );
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
    <div style={{
        padding: "40px", 
        position: "relative", 
        background: "linear-gradient(45deg, #ff7e5f, #feb47b)", 
        borderRadius: "15px", 
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)", 
        overflow: "hidden"
      }}>
        <h1 style={{
          color: "#fff", 
          textAlign: "center", 
          fontFamily: "'Roboto', sans-serif", 
          fontSize: "36px", 
          textTransform: "uppercase", 
          letterSpacing: "2px", 
          position: "relative", 
          zIndex: 2, 
          animation: "slideIn 1s ease-out"
        }}>
          Explore Posts
        </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <p className="text-center text-xl text-gray-500">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card bg-white p-5 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out">
              <img
                src={post.imageUrl}
                alt="Disaster"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{post.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <p className="text-gray-500">{post.category}</p>
                <p className="text-gray-500">{new Date(post.disasterDate).toLocaleDateString()}</p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center">
                  <button
                    onClick={() => handleLike(post._id, 'currentUserId')} // Replace 'currentUserId' with actual user ID
                    className={`flex items-center space-x-2 ${post.likes.includes('currentUserId') ? 'text-indigo-600' : 'text-gray-500'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 9l3 3-3 3m0 0l-3 3m3-3H7" />
                    </svg>
                    <span>{post.likes.length} Likes</span>
                  </button>
                </div>
                {/* Show the status based on isUpcoming */}
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
  );
};

export default PostView;
