import React, { useState, useEffect } from "react";
import { FaImage } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { MapPin, Loader2 } from "lucide-react";

const PostForm = ({
  onSubmit,
  initialData,
  isEdit,
  onPostCreated,
  onUpdateSuccess,
}) => {
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Disaster",
    location: "",
    disasterDate: "",
    imageUrl: "",
    isUpcoming: false,
  });


  const createPost = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create post");
      }
      onPostCreated();
      onUpdateSuccess();
      toast.success("Post Created successfully");
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  const updatePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${formData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update post");
      }
      toast.success("Post updated successfully");
      onUpdateSuccess();
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        disasterDate: initialData.disasterDate
          ? new Date(initialData.disasterDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [initialData]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: false,
    maxFiles: 1,
    noClick: true,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles[0]) {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
          // Send image to your backend to upload to Cloudinary
          const response = await fetch("http://localhost:5000/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();

          if (data.url) {
            setFormData((prev) => ({
              ...prev,
              imageUrl: data.url, // Save Cloudinary URL
            }));
          } else {
            toast.error("Failed to upload image");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image");
        }
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.location.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (isEdit) {
      await updatePost(); // Make sure the update happens only once.
    } else {
      await createPost();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prev) => {
      let updatedValue = type === "checkbox" ? checked : value;
  
      // Handle the logic for disasterDate to automatically check "Mark as upcoming" for future dates
      if (name === "disasterDate") {
        const futureDate = new Date(value) > new Date();
        updatedValue = value;
        
        return {
          ...prev,
          [name]: updatedValue,
          isUpcoming: futureDate, // Automatically check if the date is in the future
        };
      }
  
      return { ...prev, [name]: updatedValue };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-sm ring-0 outline-none rounded-lg border border-gray-200 focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Enter post title"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 text-sm ring-0 outline-none rounded-lg border border-gray-200 focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Enter post description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-3 py-2  accent-green-300 appearance-none  ring-0 outline-none text-sm rounded-lg border focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm`}
            >
              {[
                "Floods",
                "Earthquakes",
                "Landslides",
                "Tornadoes",
                "Wildfires",
                "Hurricanes",
                "Tsunamis",
              ].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}{" "}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2  ring-0 outline-none text-sm rounded-lg border border-gray-200 focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
                placeholder="Enter location"
                required
              />
            </div>
          </div>
        </div>

        {formData.category && (
          <div>
      <label
      htmlFor="disasterDate"
      className="block text-sm font-medium text-gray-700"
    >
      Disaster Date
    </label>
    <input
      type="date"
      id="disasterDate"
      name="disasterDate"
      value={formData.disasterDate}
      onChange={handleInputChange}
      className={`w-full px-3 py-2 text-sm rounded-lg border  ring-0 outline-none  focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm`}
      required
    />
  </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <div
            {...getRootProps()}
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
              isDragActive ? "border-green-500 bg-green-50" : "border-gray-300"
            } border-dashed rounded-lg transition-colors`}
          >
            <div className="space-y-2 text-center">
              {formData.imageUrl ? (
                <div className="relative">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="mx-auto h-32 w-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, imageUrl: "" }))
                    }
                    className="absolute -top-2 -right-2 bg-red-500 h-6 w-6 text-white rounded-full  hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <input {...getInputProps()} />
                    <button
                      type="button"
                      onClick={open}
                      className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 border-none ring-0 outline-none "
                    >
                      Upload a file
                    </button>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="isUpcoming"
            name="isUpcoming"
            type="checkbox"
            checked={formData.isUpcoming}
            onChange={handleInputChange}
            className="h-5 w-5 text-green-600 accent-green-500 focus:ring-green-500 border-gray-300 rounded transition-colors"
          />
          <label
            htmlFor="isUpcoming"
            className="ml-2 block text-sm text-gray-900"
          >
            Mark as upcoming
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2.5 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm transition-colors"
      >
        {isEdit ? "Update Post" : "Add Post"}
      </button>
    </form>
  );
};

export default PostForm;
