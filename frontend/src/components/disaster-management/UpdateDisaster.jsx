import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function UpdateDisaster() {


    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id =useParams().id;

    useEffect(() => {
        const fetchHandler = async () => {
            await axios .get(`http://localhost:5000/disaster/${id}`)
            .then((res) => res.data)
            .then((data) => setInputs(data.disaster))
        };
        fetchHandler();
    },[id]);

    const sendRequest = async () => {
        await axios.put(`http://localhost:5000/disaster/${id}`, 
        {
            disasterType: inputs.disasterType,
            severityLevel: inputs.severityLevel,
            description: inputs.description,
            numberOfPeopleAffected: inputs.numberOfPeopleAffected,
            images: inputs.images,
            date: inputs.date,
            Location: inputs.Location,
            contact: inputs.contact,
        }
        )
        .then((res) =>res.data);
    }

    const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().
        then(()=>
            history('/DisasterDetails'));
      }
    


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Update Disaster</h1>
            <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Disaster Type</label>
                        <input 
                            type="text" 
                            name="disasterType" 
                            value={inputs.disasterType} 
                            onChange={handleChange} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Severity Level</label>
                        {/* <input type="text" name="severityLevel" value={inputs.severityLevel} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/> */}
                        <select name="severityLevel" value={inputs.severityLevel} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded">
                
                <option value="Select Severity">Select Severity</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input 
                            type="text" 
                            name="description" 
                            value={inputs.description} 
                            onChange={handleChange} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Number of People Affected</label>
                        <input 
                            type="text" 
                            name="numberOfPeopleAffected" 
                            value={inputs.numberOfPeopleAffected} 
                            onChange={handleChange} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Images</label>
                        <input 
                            type="text" 
                            name="images" 
                            value={inputs.images} 
                            onChange={handleChange} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input 
                            type="text" 
                            name="date" 
                            value={inputs.date} 
                            onChange={handleChange} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input 
                            type="text" 
                            name="Location" 
                            value={inputs.Location} 
                            onChange={handleChange} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact</label>
                        <input 
                            type="text" 
                            name="contact" 
                            value={inputs.contact} 
                            onChange={handleChange} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
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
    );
}
