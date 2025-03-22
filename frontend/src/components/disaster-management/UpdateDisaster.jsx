import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigationbar from "../main-components/Navigationbar";
import Footer from "../main-components/footer";

export default function UpdateDisaster() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({
    date: "",
    contact: "",
    disasterType: "",
    severityLevel: "",
    numberOfPeopleAffected: "",
  });
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/disaster/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.disaster));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/disaster/${id}`, {
        disasterType: inputs.disasterType,
        severityLevel: inputs.severityLevel,
        description: inputs.description,
        numberOfPeopleAffected: inputs.numberOfPeopleAffected,
        images: inputs.images,
        date: inputs.date,
        Location: inputs.Location,
        contact: inputs.contact,
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateDate = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const tenDaysBefore = new Date(currentDate);
    tenDaysBefore.setDate(currentDate.getDate() - 10);

    if (inputDate > currentDate) {
      return "Date cannot be in the future.";
    }
    if (inputDate < tenDaysBefore) {
      return "Date must be within the last 10 days.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate date
    const dateError = validateDate(inputs.date);
    if (dateError) {
      setErrors((prevState) => ({
        ...prevState,
        date: dateError,
      }));
      return;
    }

    // Validate contact number length
    if (inputs.contact.length !== 10) {
      setErrors((prevState) => ({
        ...prevState,
        contact: "Phone number must be exactly 10 digits.",
      }));
      return;
    }

    // Check if disasterType is selected
    if (inputs.disasterType === "") {
      setErrors((prevState) => ({
        ...prevState,
        disasterType: "Please select a disaster type.",
      }));
      return;
    }

    // Check if severityLevel is selected
    if (inputs.severityLevel === "") {
      setErrors((prevState) => ({
        ...prevState,
        severityLevel: "Please select a severity level.",
      }));
      return;
    }

    // Check if numberOfPeopleAffected is negative
    if (inputs.numberOfPeopleAffected < 0) {
      setErrors((prevState) => ({
        ...prevState,
        numberOfPeopleAffected: "Number of people affected cannot be negative.",
      }));
      return;
    }

    try {
      await sendRequest();
      history("/DisasterDetails");
    } catch (err) {
      // Handle backend error
      console.error("Error updating disaster:", err);
    }
  };

  return (
    <>
    <Navigationbar />
    <div className="container mx-auto p-4 max-w-lg ">
      <h1 className="text-2xl font-bold mb-4 text-center">UPDATE DISASTER</h1>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Disaster Type
            </label>
            <select
              name="disasterType"
              value={inputs.disasterType}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            >
              <option value="">--Select Disaster Type--</option>
              <option value="Flood">Flood</option>
              <option value="Earthquake">Earthquake</option>
              <option value="Hurricane">Hurricane</option>
              <option value="Wildfire">Wildfire</option>
              <option value="Tornado">Tornado</option>
            </select>
            {errors.disasterType && (
              <p className="text-red-500 text-xs italic">{errors.disasterType}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Severity Level
            </label>
            <select
              name="severityLevel"
              value={inputs.severityLevel}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            >
              <option value="">--Select Severity--</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
            {errors.severityLevel && (
              <p className="text-red-500 text-xs italic">
                {errors.severityLevel}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm  font-medium text-gray-700">
              Description
            </label>
            <input type="text" name="description" value={inputs.description} onChange={handleChange} className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of People Affected </label>
            <input type="text"name="numberOfPeopleAffected"value={inputs.numberOfPeopleAffected} onChange={handleChange} className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            {errors.numberOfPeopleAffected && ( <p className="text-red-500 text-xs italic"> {errors.numberOfPeopleAffected} </p>)}
          </div>
          <div>
            {/* <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <input
              type="text"
              name="images"
              value={inputs.images}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            /> */}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input type="date" name="date" value={inputs.date} onChange={handleChange} className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            {errors.date && (<p className="text-red-500 text-xs italic">{errors.date}</p> )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700"> Location </label>
            <input type="text" name="Location" value={inputs.Location} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="text"
              name="contact"
              value={inputs.contact}
              onChange={handleChange}
              className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.contact && (
              <p className="text-red-500 text-xs italic">{errors.contact}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}
