import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    disasterDate: "",
    isUpcoming: false,
    image: null,
  });

  const [editingPost, setEditingPost] = useState(null); // State to store the post being edited

  // Fetch all posts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setNewPost((prev) => ({
      ...prev,
      image: e.target.files[0], // Store the file object for later submission
    }));
  };

  // Handle form submission for new or edited post
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const formData = new FormData();
  //     formData.append("title", newPost.title);
  //     formData.append("description", newPost.description);
  //     formData.append("category", newPost.category);
  //     formData.append("location", newPost.location);
  //     formData.append("disasterDate", newPost.disasterDate);
  //     formData.append("isUpcoming", newPost.isUpcoming);
  //     if (newPost.image) formData.append("image", newPost.image); // Append image if selected

  //     try {
  //       const token = localStorage.getItem("authToken");
  //       let response;

  //       if (editingPost) {
  //         // If editing, update the post
  //         response = await axios.put(`http://localhost:5000/api/posts/${editingPost._id}`, formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         // Update the post in the UI after editing
  //         setPosts(posts.map((post) => (post._id === editingPost._id ? response.data : post)));
  //       } else {
  //         // If creating new post
  //         response = await axios.post("http://localhost:5000/api/posts", formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         setPosts([...posts, response.data]); // Update UI with the new post
  //       }

  //       setOpen(false); // Close modal after submission
  //       setNewPost({
  //         title: "",
  //         description: "",
  //         category: "",
  //         location: "",
  //         disasterDate: "",
  //         isUpcoming: false,
  //         image: null,
  //       });
  //       setEditingPost(null); // Reset editingPost state
  //     } catch (error) {
  //       console.error("Error submitting post:", error);
  //     }
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("description", newPost.description);
    formData.append("category", newPost.category);
    formData.append("location", newPost.location);
    formData.append("disasterDate", newPost.disasterDate);
    formData.append("isUpcoming", newPost.isUpcoming);
    if (newPost.image) formData.append("image", newPost.image); // Append image if selected

    try {
      const token = localStorage.getItem("authToken");
      let response;

      if (editingPost) {
        // If editing, update the post
        response = await axios.put(
          `http://localhost:5000/api/posts/${editingPost._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Ensure multipart form data header is set
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Update the post in the UI after editing
        setPosts(
          posts.map((post) =>
            post._id === editingPost._id ? response.data : post
          )
        );
      } else {
        // If creating a new post
        response = await axios.post(
          "http://localhost:5000/api/posts",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts([...posts, response.data]); // Update UI with the new post
      }

      setOpen(false); // Close modal after submission
      setNewPost({
        title: "",
        description: "",
        category: "",
        location: "",
        disasterDate: "",
        isUpcoming: false,
        image: null,
      });
      setEditingPost(null); // Reset editingPost state
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  // Open modal for editing a post
  const handleEdit = (post) => {
    setEditingPost(post); // Set the selected post for editing
    setNewPost({
      ...post,
      disasterDate: post.disasterDate.slice(0, 10), // Extract date part for input field (format: YYYY-MM-DD)
    }); // Populate form with post details
    setOpen(true); // Open the modal
  };

  // Handle modal close
  const handleClose = () => {
    setOpen(false);
    setEditingPost(null);
    setNewPost({
      title: "",
      description: "",
      category: "",
      location: "",
      disasterDate: "",
      isUpcoming: false,
      image: null,
    });
  };

  return (
    <div
      style={{
        padding: "40px",
        position: "relative",
        background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <h1
        style={{
          color: "#fff",
          textAlign: "center",
          fontFamily: "'Roboto', sans-serif",
          fontSize: "36px",
          textTransform: "uppercase",
          letterSpacing: "2px",
          position: "relative",
          zIndex: 2,
          animation: "slideIn 1s ease-out",
        }}
      >
        Manage Posts
      </h1>

      {/* Create New Post Button */}
      <Button
        variant="contained"
        color="primary"
        style={{ position: "absolute", top: 20, right: 20 }}
        onClick={() => setOpen(true)}
      >
        Create New Post
      </Button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {posts.map((post) => (
            <Card
              key={post._id}
              sx={{
                width: "60%",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                marginLeft: "400px",
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ margin: "10px 0", color: "#666" }}
                >
                  {post.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#888" }}
                >
                  <strong>Category:</strong> {post.category}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#888" }}
                >
                  <strong>Location:</strong> {post.location}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#888" }}
                >
                  <strong>Date:</strong>{" "}
                  {new Date(post.disasterDate).toLocaleDateString()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "#888" }}
                >
                  <strong>Upcoming:</strong> {post.isUpcoming ? "Yes" : "No"}
                </Typography>
                {post.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.imageUrl}
                    alt="Post Image"
                    sx={{ marginTop: "20px", objectFit: "cover" }}
                  />
                )}
                <div style={{ marginTop: "20px" }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginRight: "15px" }}
                    onClick={() => handleEdit(post)}
                  >
                    <Edit />
                    Edit
                  </Button>
                  <Button variant="outlined" color="error">
                    <Delete />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create or Edit Post Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>{editingPost ? "Edit Post" : "Create New Post"}</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              margin="normal"
              value={newPost.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={newPost.description}
              onChange={handleChange}
              required
            />

            {/* Category Dropdown */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newPost.category}
                onChange={handleChange}
                label="Category"
              >
                <MenuItem value="Disaster">Disaster</MenuItem>
                <MenuItem value="Resources">Resources</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              value={newPost.location}
              onChange={handleChange}
              required
            />

            {/* Date Input */}
            <TextField
              label="Disaster Date"
              name="disasterDate"
              type="date"
              fullWidth
              margin="normal"
              value={newPost.disasterDate}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />

            {/* Conditionally render isUpcoming based on category */}
            {newPost.category === "Disaster" && (
              <FormControlLabel
                control={
                  <Checkbox
                    name="isUpcoming"
                    checked={newPost.isUpcoming}
                    onChange={handleChange}
                  />
                }
                label="Is this an upcoming disaster?"
              />
            )}

            <input type="file" name="image" onChange={handleImageChange} />

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                {editingPost ? "Update Post" : "Create Post"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminPanel;
