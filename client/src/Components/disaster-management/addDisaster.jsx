import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MapPin, AlertCircle, Loader2 } from "lucide-react";
import mapimage from "../../assets/map4.png";

export default function AddDisaster() {
  const history = useNavigate();
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  const [inputs, setInputs] = useState({
    disasterType: "",
    severityLevel: "",
    description: "",
    numberOfPeopleAffected: "",
    images: "",
    date: "",
    Location: "",
    contact: "",
  });

  const [text, setText] = useState("");
  const quotes = [
    "STAY CALM, DON'T BE PANIC",
    "HELP OTHERS IN NEED",
    "PREPARE BEFORE DISASTER STRIKES",
    "SAFETY FIRST, ALWAYS",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true); // Tracks whether we are typing or deleting
  const [charIndex, setCharIndex] = useState(0); // Tracks the current character index for typing and deleting

  const [errors, setErrors] = useState({
    disasterType: "",
    severityLevel: "",
    numberOfPeopleAffected: "",
    contact: "", // Error for phone number validation
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is "contact" (phone number), ensure it contains only digits
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if disasterType is selected
    if (inputs.disasterType === "") {
      setErrors((prevState) => ({
        ...prevState,
        disasterType: "Please select a disaster type.",
      }));
      return; // Prevent form submission if disaster type is not selected
    }

    if (inputs.severityLevel === "") {
      setErrors((prevState) => ({
        ...prevState,
        severityLevel: "Please select a severity level.",
      }));
      return;
    }

    // Check if number of people affected is negative
    if (inputs.numberOfPeopleAffected < 0) {
      setErrors((prevState) => ({
        ...prevState,
        numberOfPeopleAffected: "Number of people affected cannot be negative.",
      }));
      return; // Prevent form submission if the value is negative
    }

    // Validate the phone number length (should be exactly 10 digits)
    if (inputs.contact.length !== 10) {
      setErrors((prevState) => ({
        ...prevState,
        contact: "Phone number must be exactly 10 digits.",
      }));
      return; // Prevent form submission if the phone number is not 10 digits
    }

    // Date validation: Date should not be in the future and should not be older than 10 days
    const currentDate = new Date();
    const selectedDate = new Date(inputs.date);
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(currentDate.getDate() - 10);

    if (selectedDate > currentDate) {
      setErrors((prevState) => ({
        ...prevState,
        date: "Date cannot be in the future.",
      }));
      return;
    }

    if (selectedDate < tenDaysAgo) {
      setErrors((prevState) => ({
        ...prevState,
        date: "Date cannot be more than 10 days ago.",
      }));
      return;
    }

    try {
      await sendRequest();
      history("/Disaster");
      toast.success("Disaster record create successfully!");
    } catch (err) {
      if (err.response && err.response.data) {
        // Handle backend error (if disasterType is required in backend)
        setErrors((prevState) => ({
          ...prevState,
          disasterType: err.response.data.message || "An error occurred.",
        }));

        toast.error(err.response.data.message || "An error occurred.");
      }
    }
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/api/disaster", {
      disasterType: inputs.disasterType,
      severityLevel: inputs.severityLevel,
      description: inputs.description,
      numberOfPeopleAffected: inputs.numberOfPeopleAffected,
      images: inputs.images,
      date: inputs.date,
      Location: inputs.Location,
      contact: inputs.contact,
    });
  };

  useEffect(() => {
    const currentQuote = quotes[quoteIndex];

    const interval = setInterval(() => {
      if (isTyping) {
        // Typing Mode
        if (charIndex < currentQuote.length) {
          setText((prev) => prev + currentQuote[charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setIsTyping(false); // Start deleting once typing is done
        }
      } else {
        // Deleting Mode
        if (charIndex > 0) {
          setText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          // Once deleting is done, switch to the next quote
          setIsTyping(true);
          setQuoteIndex((prev) => (prev + 1) % quotes.length); // Loop through the quotes
        }
      }
    }, 120); // Adjust typing/deleting speed here

    return () => clearInterval(interval);
  }, [charIndex, isTyping, quoteIndex]);

  const [loadingLocation, setLoadingLocation] = useState(false);

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

  return (
    <>
      <div className="min-h-screen relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50/30">
        {/* Enhanced Background Effect */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(51,65,85,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.15),transparent_70%)]" />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]"
            style={{ backgroundSize: "4rem 4rem" }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2320202320' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              opacity: 0.4,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <div
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300"
            style={{ perspective: "1000px" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form Section */}
              <div className="p-8 lg:p-12 relative">
                {/* Form Background Pattern and 3D Image */}
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-10 blur-sm"
                    style={{ backgroundImage: `url(${mapimage})` }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />
                </div>
                <div className="relative">
                  <div className="max-w-lg mx-auto">
                    <div className="flex flex-col">
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-2">
                        Report Disaster
                      </h1>
                      <p className="text-sm text-gray-500 mb-8">
                        Help us respond faster by submitting details of any
                        disaster you encounter.
                      </p>
                    </div>

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
                              errors.disasterType
                                ? "border-red-500"
                                : "border-gray-200"
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
                            <p className="mt-1 text-xs text-red-600">
                              {errors.disasterType}
                            </p>
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
                              errors.severityLevel
                                ? "border-red-500"
                                : "border-gray-200"
                            } focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm`}
                          >
                            <option value="">Select Severity</option>
                            {["Low", "Medium", "High", "Critical"].map(
                              (level) => (
                                <option key={level} value={level}>
                                  {level}
                                </option>
                              )
                            )}
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
                            <p className="mt-1 text-xs text-red-600">
                              {errors.date}
                            </p>
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
                            errors.contact
                              ? "border-red-500"
                              : "border-gray-200"
                          } focus:border-green-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm`}
                          placeholder="Enter 10-digit number"
                        />
                        {errors.contact && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.contact}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 bg-gradient-to-r from-green-600 to-green-500 text-white text-sm rounded-lg hover:from-green-700 hover:to-green-600 focus:outline-none transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/25"
                      >
                        Submit Report
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Quote Section */}
              <div className="relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${mapimage})` }}
                ></div>
                <div className="relative h-full flex items-center justify-center p-8 lg:p-12  ">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/10 backdrop-blur-sm">
                      <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex flex-col bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                      <h2 className="text-4xl font-bold text-white mb-4">
                        Emergency Alert
                      </h2>
                      <div>
                        <p
                          className="text-2xl font-medium text-white h-20 flex items-center justify-center"
                          style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                          {text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
