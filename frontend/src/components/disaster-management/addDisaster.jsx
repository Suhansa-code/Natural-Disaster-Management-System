import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddDisaster ()  {

  const history = useNavigate();

  const [inputs, setInputs] = useState({     
    disasterType: "",
    severityLevel: "",
    description: "",
    numberOfPeopleAffected: "",
    images:"",
    date: "",
    Location: "",
    contact: "",

  });

  

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    sendRequest().then(()=>history('/DisasterDetails'));
  }

  const sendRequest = async () => {
    
    await axios.post("http://localhost:5000/disaster" ,{
      disasterType: inputs.disasterType,
      severityLevel: inputs.severityLevel,
      description: inputs.description,
      numberOfPeopleAffected: inputs.numberOfPeopleAffected,
      images: inputs.images,
      date: inputs.date,
      Location: inputs.Location,
      contact: inputs.contact,
      
    })
    
  }

  return (
    <div className="flex h-screen ">
    
      {/* Left Side - Form */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-gray-100 rounded-tl-lg rounded-bl-lg">
        <div className="max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-10">Enter Here </h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 "> Disaster Type </label> 
              <select name="disasterType" value={inputs.disasterType} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded">

              <option value="Select Type ">Select Type </option>
              <option value="Floods">Floods</option>
              <option value="Earthquakes">Earthquakes</option>
              <option value="Landslides">Landslides</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Severity</label>
              <select name="severityLevel" value={inputs.severityLevel} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded">
                
                <option value="Select Severity">Select Severity</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Description </label>
              <textarea name="description" value={inputs.description} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded"> </textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Location </label>
              <div className="flex space-x-2">
                <input type="text" name="Location"value={inputs.Location} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded"/>
                {/* <button type="button" onClick={} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"> Get Location</button>  */}
              </div>
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700"> Number of People Affected </label>
              <input  type="number"name="numberOfPeopleAffected"value={inputs.numberOfPeopleAffected} onChange={handleChange} required className="mt-1 p-2 w-full border rounded"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Date </label>
              <input type="date" name="date" value={inputs.date} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Phone Number{" "} </label>
              <input type="text" name="contact" value={inputs.contact} onChange={handleChange} placeholder="Enter phone" className="mt-1 p-2 w-full border border-gray-300 rounded"/>
            </div>

            <button
              type="submit" className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-yellow-500 w-full" onClick={handleSubmit}>SUBMIT</button>
          </form>
        </div>
      </div>

      {/* Right Side - Auto Typing and Deleting Quotes */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100 text-black text-6xl font-bold text-center px-5 rounded-tr-lg rounded-br-lg">
        <p></p>
      </div>
    </div>
  );
};



