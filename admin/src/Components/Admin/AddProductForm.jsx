import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaTrash, FaSpinner } from "react-icons/fa";

export default function AddProductForm({ onCreate, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stoke: "",
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updatedImages);
  };

  const handleSave = async () => {
    setIsLoading(true); // Start loading animation
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("stoke", formData.stoke);

      // Append image files to the FormData
      imageFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });

      // Call the onCreate function to make the API call
      await onCreate(formDataToSend);
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-secondary-100 mb-4 space-y-5 mx-20">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <div className="mb-4 flex flex-row text-left px-10 items-center">
        <label className="block text-secondary-100 mb-2 w-[200px]">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="border-[1.5px] border-brown-100 focus:border-secondary-100 ring-0 outline-none focus:ring-secondary-100 rounded-[5px] p-2 w-full"
        />
      </div>
      <div className="mb-4 flex flex-row text-left px-10 items-center">
        <label className="block text-secondary-100 mb-2 w-[200px]">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="border-[1.5px] border-brown-100 focus:border-secondary-100 ring-0 outline-none focus:ring-secondary-100 rounded-[5px] p-2 w-full"
        ></textarea>
      </div>
      <div className="mb-4 flex flex-row text-left px-10 items-center">
        <label className="block text-secondary-100 mb-2 w-[200px]">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="border-[1.5px] border-brown-100 focus:border-secondary-100 ring-0 outline-none focus:ring-secondary-100 rounded-[5px] p-2 w-full"
        />
      </div>
      <div className="mb-4 flex flex-row text-left px-10 items-center">
        <label className="block text-secondary-100 mb-2 w-[200px]">Stock</label>
        <input
          type="number"
          name="stoke"
          value={formData.stoke}
          onChange={handleInputChange}
          className="border-[1.5px] border-brown-100 focus:border-secondary-100 ring-0 outline-none focus:ring-secondary-100 rounded-[5px] p-2 w-full"
        />
      </div>
      <div className="mb-4 flex flex-row text-left px-10 items-center">
        <label className="block text-secondary-100 mb-2 w-[200px]">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="border-[1.5px] border-brown-100 focus:border-secondary-100 ring-0 outline-none focus:ring-secondary-100 rounded-[5px] p-2 w-full"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Chair and Couch">Chair and Couch</option>
          <option value="Bedside Table">Bedside Table</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4 flex flex-row text-left px-10 items-center">
        <label className="block text-secondary-100 mb-2 w-[200px]">
          Images
        </label>
        <div className="flex gap-4 items-center flex-wrap">
          {imageFiles.map((file, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="bg-red-600 h-8 w-8 text-white px-2 py-1 mt-3 rounded-full"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          {imageFiles.length < 3 && (
            <label className="cursor-pointer bg-secondary-100 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <FaPlus /> Add Image
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-secondary-200 text-secondary-100 rounded-lg"
          disabled={isLoading} // Disable button during loading
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-secondary-100 text-white rounded-lg flex items-center gap-2"
          disabled={isLoading} // Disable button during loading
        >
          {isLoading && <FaSpinner className="animate-spin" />} {/* Spinner */}
          {isLoading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}

AddProductForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
