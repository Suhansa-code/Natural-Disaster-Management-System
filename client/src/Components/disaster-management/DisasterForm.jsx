import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { MapPin, AlertCircle, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa";

const AddDisaster = ({ onSubmit, initialData, isEdit }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    type: "",
    severity: "",
    contact: "",
    peopleAffected: "",
    date: "",
    description: "",
    images: "",
  });

  const [errors, setErrors] = useState({
    disasterType: "",
    severityLevel: "",
    numberOfPeopleAffected: "",
    contact: "", // Error for phone number validation
  });
  const [typingText, setTypingText] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [location, setLocation] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const quote = "“Disaster is not the end, but the beginning of resilience.”";

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true); // Start loading
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const address = data.display_name;

            setInputs((prevState) => ({
              ...prevState,
              Location: address,
            }));
            setShowMap(true);
          } catch (error) {
            console.error("Error fetching location:", error);
            toast.error("Unable to fetch location details. Try again.");
            setShowMap(false);
          } finally {
            setLoadingLocation(false); // Stop loading
          }
        },
        (error) => {
          console.error("Geolocation Error:", error);
          toast.error("Location access denied. Enable GPS and try again.");
          setLoadingLocation(false); // Stop loading
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const contactRegex = /^\d{10}$/;
    const { type, severity, contact, peopleAffected, date } = inputs;
    const currentDate = new Date();
    const selectedDate = new Date(date);
    const maxPastDate = new Date();
    maxPastDate.setDate(currentDate.getDate() - 10);

    if (!type) newErrors.type = "Disaster type is required";
    if (!severity) newErrors.severity = "Severity is required";
    if (!contactRegex.test(contact))
      newErrors.contact = "Contact must be a 10-digit number";
    if (parseInt(peopleAffected) < 0)
      newErrors.peopleAffected = "Cannot be negative";
    if (!date) newErrors.date = "Date is required";
    else if (selectedDate > currentDate || selectedDate < maxPastDate)
      newErrors.date =
        "Date must be within the last 10 days and not in the future";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => setInputs({ ...inputs, images: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "contact") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      setInputs((prevState) => ({
        ...prevState,
        [name]: numericValue,
      }));

      // Reset contact error message when the user starts typing
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact: "",
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const sendRequest = async () => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/disaster", {
        ...inputs,
        coordinates,
        location,
      });
      toast.success("Disaster reported successfully!");
      setInputs({
        type: "",
        severity: "",
        contact: "",
        peopleAffected: "",
        date: "",
        description: "",
        images: "",
      });
      setErrors({});
      setCoordinates(null);
      setLocation("");
      setShowMap(false);
      navigate("/Disaster");
    } catch (err) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) sendRequest();
  };

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
            setInputs((prev) => ({
              ...prev,
              images: data.url, // Save Cloudinary URL
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

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypingText((prev) => prev + quote[index]);
      index++;
      if (index === quote.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Disaster Type & Severity Level */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Disaster Type
            </label>
            <select
              name="disasterType"
              value={inputs.disasterType}
              onChange={handleChange}
              className={`w-full px-3 py-2  ring-0 outline-none text-sm rounded-lg border ${
                errors.disasterType ? "border-red-500" : "border-gray-200"
              } focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm`}
            >
              <option value="" className="text-gray-500">
                Select Type
              </option>
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
              ))}
            </select>
            {errors.disasterType && (
              <p className="mt-1 text-xs text-red-600">{errors.disasterType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Severity Level
            </label>
            <select
              name="severityLevel"
              value={inputs.severityLevel}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm  ring-0 outline-none rounded-lg border ${
                errors.severityLevel ? "border-red-500" : "border-gray-200"
              } focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm`}
            >
              <option value="">Select Severity</option>
              {["Low", "Medium", "High", "Critical"].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.severityLevel && (
              <p className="mt-1 text-xs text-red-600">
                {errors.severityLevel}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            value={inputs.description}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm ring-0 outline-none rounded-lg border border-gray-200 focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Describe the situation..."
          />
        </div>

        {/* Location with Get Location button */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="Location"
              value={inputs.Location}
              onChange={handleChange}
              className="flex-1 px-3 py-2  ring-0 outline-none text-sm rounded-lg border border-gray-200 focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
              placeholder="Enter location"
            />
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={loadingLocation}
              className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none transition-colors duration-200 disabled:opacity-50 shadow-lg hover:shadow-green-500/25"
            >
              {loadingLocation ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Map View */}
        {showMap && coordinates.lat && coordinates.lon && (
          <div className="rounded-lg overflow-hidden h-[200px] border border-gray-200 shadow-lg">
            <iframe
              title="Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lon - 0.01},${coordinates.lat - 0.01},${coordinates.lon + 0.01},${coordinates.lat + 0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.lon}`}
              className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        )}

        {/* Number of People & Date */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              People Affected
            </label>
            <input
              type="number"
              name="numberOfPeopleAffected"
              value={inputs.numberOfPeopleAffected}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm rounded-lg border  ring-0 outline-none ${
                errors.numberOfPeopleAffected
                  ? "border-red-500"
                  : "border-gray-200"
              } focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm`}
              placeholder="0"
            />
            {errors.numberOfPeopleAffected && (
              <p className="mt-1 text-xs text-red-600">
                {errors.numberOfPeopleAffected}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm rounded-lg border  ring-0 outline-none ${
                errors.date ? "border-red-500" : "border-gray-200"
              } focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm`}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-600">{errors.date}</p>
            )}
          </div>
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="text"
            name="contact"
            value={inputs.contact}
            onChange={handleChange}
            className={`w-full px-3 py-2 text-sm rounded-lg border  ring-0 outline-none ${
              errors.contact ? "border-red-500" : "border-gray-200"
            } focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm`}
            placeholder="Enter 10-digit number"
          />
          {errors.contact && (
            <p className="mt-1 text-xs text-red-600">{errors.contact}</p>
          )}
        </div>
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
              {inputs.images ? (
                <div className="relative">
                  <img
                    src={inputs.images}
                    alt="Preview"
                    className="mx-auto h-32 w-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setInputs((prev) => ({ ...prev, images: "" }))
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
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-gradient-to-r from-green-600 to-green-500 text-white text-sm rounded-lg hover:from-green-700 hover:to-green-600 focus:outline-none transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/25"
        >
          Submit Disaster Report
        </button>
      </form>
      {/* Seperate Here */}
      {/* <div className=" w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
          Report a Disaster
        </h2>
        <p className="italic text-center mb-4 text-gray-600">{typingText}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="type"
            placeholder="Disaster Type"
            value={inputs.type}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}

          <input
            type="text"
            name="severity"
            placeholder="Severity"
            value={inputs.severity}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
          {errors.severity && (
            <p className="text-red-500 text-sm">{errors.severity}</p>
          )}

          <InputMask
            mask="9999999999"
            name="contact"
            placeholder="Contact Number"
            value={inputs.contact}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact}</p>
          )}

          <input
            type="number"
            name="peopleAffected"
            placeholder="People Affected"
            value={inputs.peopleAffected}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
          {errors.peopleAffected && (
            <p className="text-red-500 text-sm">{errors.peopleAffected}</p>
          )}

          <input
            type="date"
            name="date"
            value={inputs.date}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

          <textarea
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="file"
            accept="image/*"
            name="images"
            onChange={handleChange}
            className="w-full"
          />
          {inputs.images && (
            <img
              src={inputs.images}
              alt="preview"
              className="w-32 h-32 object-cover mt-2 rounded-xl"
            />
          )}

          <button
            type="button"
            onClick={handleLocation}
            disabled={loading}
            className="w-full p-3 bg-blue-500 text-white rounded-xl mt-2 hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Detecting Location..." : "Use My Location"}
          </button>

          {showMap && coordinates && (
            <div className="mt-4">
              <iframe
                title="location map"
                width="100%"
                height="200"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lon - 0.01}%2C${coordinates.lat - 0.01}%2C${coordinates.lon + 0.01}%2C${coordinates.lat + 0.01}&layer=mapnik&marker=${coordinates.lat}%2C${coordinates.lon}`}
                className="rounded-xl"
              ></iframe>
              <p className="mt-2 text-sm text-gray-600">
                Detected Location: {location}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div> */}
    </>
  );
};

export default AddDisaster;
