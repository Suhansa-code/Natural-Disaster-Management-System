import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaThumbsUp, FaPlus } from "react-icons/fa"; 
import Footer from "../main-components/footer";

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Disaster");
  const [location, setLocation] = useState("");
  const [disasterDate, setDisasterDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(sortedPosts);
    } catch (err) {
      setError("There was an error fetching the posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setDescription(post.description);
    setCategory(post.category);
    setLocation(post.location);
    setDisasterDate(post.disasterDate);
    setImageUrl(post.imageUrl);
    setIsUpcoming(post.isUpcoming);
  };
  const handleCancelEdit = () => {
    setEditingPost(null);
    setSuccessMessage(""); // Clear success message on cancel
  };

 const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = { title, description, category, location, disasterDate, imageUrl, isUpcoming };
      await axios.put(`http://localhost:5000/api/posts/${editingPost._id}`, updatedPost);
      setSuccessMessage("Post updated successfully!");
      fetchPosts();
      setEditingPost(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleAddPost = () => {
    navigate("/addposts"); 
  };
  

  const handleLike = async (postId) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${postId}/like`);
      fetchPosts(); 
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };



  return (
    <>
    <div className="min-h-screen bg-gray-300 py-10">
      <div className="container mx-auto px-4 md:px-30 lg:px-50 relative"> 
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">All Posts</h1>

        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          onClick={handleAddPost}
          className="absolute top-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
        >
          <FaPlus className="inline-block mr-2" /> Create Post
        </button>

        {editingPost && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Post</h2>
            <form onSubmit={handleSubmitEdit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-gray-700">Title</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-gray-700">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="4"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-gray-700">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Disaster">Disaster</option>
                  <option value="Resources">Resources</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="block text-gray-700">Location</label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="disasterDate" className="block text-gray-700">Disaster Date</label>
                <input
                  id="disasterDate"
                  type="date"
                  value={disasterDate}
                  onChange={(e) => setDisasterDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="imageUrl" className="block text-gray-700">Image URL</label>
                <input
                  id="imageUrl"
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {category === "Disaster" && (
                <div className="space-y-2">
                  <label htmlFor="isUpcoming" className="block text-gray-700">Is this an upcoming disaster?</label>
                  <input
                    id="isUpcoming"
                    type="checkbox"
                    checked={isUpcoming}
                    onChange={(e) => setIsUpcoming(e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>
              )}

              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}


        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                <p className="text-gray-600">{post.description}</p>
              </div>

              <div className="mb-2">
                <span className="text-gray-500 font-bold">Category:</span> {post.category}
              </div>
              <div className="mb-2">
                <span className="text-gray-500 font-bold">Location:</span> {post.location}
              </div>
              <div className="mb-2">
                <span className="text-gray-500 font-bold">Posted On:</span> {new Date(post.createdAt).toLocaleString()}
              </div>

              {post.category === "Disaster" && (
                <div>
                  <span className="text-gray-500 font-bold">Disaster Date:</span>{" "}
                  <span className={`${post.isUpcoming ? "font-bold text-green-500" : "text-red-500"}`}>
                    {new Date(post.disasterDate).toLocaleDateString()}
                  </span>
                </div>
              )}

              <div className="mt-2 flex items-center">
                <button onClick={() => handleLike(post._id)} className="text-blue-500 hover:text-blue-700 flex items-center">
                  <FaThumbsUp className="mr-1" /> Like
                </button>
                <span className="ml-2 text-gray-600">({post.likes.length})</span> 
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">Comments:</h3>
                {post.comments.length > 0 ? (
                  <ul className="mt-2 bg-gray-100 p-3 rounded-lg">
                    {post.comments.map((comment, index) => (
                      <li key={index} className="text-gray-700 border-b py-1">
                        {comment}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <button onClick={() => handleEdit(post)} className="text-blue-500 hover:text-blue-700 mr-4">
                    <FaEdit className="inline-block mr-1" /> Edit
                  </button>
                  <button onClick={() => handleDelete(post._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash className="inline-block mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ViewPosts;
