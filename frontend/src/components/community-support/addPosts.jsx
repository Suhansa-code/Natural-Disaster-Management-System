import { useState } from "react";
import axios from "axios";

const AddPosts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Disaster");
  const [location, setLocation] = useState("");
  const [disasterDate, setDisasterDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [dateError, setDateError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 

  const validateDate = (date) => {
    const today = new Date();
    const disasterDateObj = new Date(date);

    today.setHours(0, 0, 0, 0); 
    disasterDateObj.setHours(0, 0, 0, 0); 

    
    if (disasterDateObj < today) {
      setDateError("Disaster date must be today or a future date.");
    } else {
      setDateError(""); // Clear the error if the date is valid
    }
  };

  const handleDisasterDateChange = (e) => {
    const selectedDate = e.target.value;
    setDisasterDate(selectedDate);
    validateDate(selectedDate); 
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // error, prevent form submission
    if (dateError) return;

    const newPost = {
      title,
      description,
      category,
      location,
      disasterDate,
      imageUrl,
      isUpcoming,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/posts", newPost);
      console.log("Post created:", response.data); // Log success

      // Show success message
      setSuccessMessage("Post created successfully!");

      setTitle("");
      setDescription("");
      setLocation("");
      setDisasterDate("");
      setImageUrl("");
      setIsUpcoming(false);

    } catch (error) {
      console.error("Error creating post:", error); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              onChange={handleDisasterDateChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {dateError && <p className="text-red-500 text-sm mt-2">{dateError}</p>}
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
              <label htmlFor="isUpcoming" className="block text-gray-700">Is this upcoming?</label>
              <input
                id="isUpcoming"
                type="checkbox"
                checked={isUpcoming}
                onChange={(e) => setIsUpcoming(e.target.checked)}
                className="w-5 h-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={dateError !== ""}
            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${dateError ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'}`}
          >
            Submit
          </button>
        </form>

        {successMessage && (
          <div className="mt-4 p-4 text-green-600 border border-green-200 rounded-md bg-green-50">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPosts;

