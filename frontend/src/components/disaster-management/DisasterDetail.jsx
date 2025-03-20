import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';




export default  function DisasterDetail(props) {
    
   const {_id,  disasterType,severityLevel,description, images, dateTimeOfIncident,  exactLocation ,numberOfPeopleAffected, date , contact} =
     props.disasters;
    console.log(_id);

    const navigate = useNavigate();

    const deleteDisaster = async () => {
        await axios.delete(`http://localhost:5000/disaster/${_id}`)
        .then((res) => res.data)
        .then((data) => {
            console.log(data);
            navigate('/DisasterDetails');
        });
    };
 
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">View Disaster</h1>
            <p className="text-gray-600 mb-6">Details of the disaster will be displayed here.</p>

            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold">Disaster ID: {_id}</h2>
                </div>
                
                <div>
                    <h2 className="text-lg font-semibold">Name:</h2>
                    <p className="text-gray-700">{disasterType}</p>
                </div>
                
                <div>
                    <h2 className="text-lg font-semibold">Severity Level:</h2>
                    <p className="text-gray-700">{severityLevel}</p>
                </div>
                
                <div>
                    <h2 className="text-lg font-semibold">Description:</h2>
                    <p className="text-gray-700">{description}</p>
                </div>
                
                <div>
                    <h2 className="text-lg font-semibold">Images:{images}</h2><p className="text-gray-700"></p>
                    
                </div>
                
                <div>
                    <h2 className="text-lg font-semibold">Date & Time:</h2>
                    <p className="text-gray-700">{dateTimeOfIncident}</p>
                </div>
                
                <div>
                    <h2 className="text-lg font-semibold">Location: {exactLocation}</h2>
                    
                </div>
                
                <div>
                    <h2 className="text-lg font-semibold">Number of People Affected:</h2>
                    <p className="text-gray-700">{numberOfPeopleAffected}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">date: </h2>
                    <p className="text-gray-700">{date}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Contact:</h2>
                    <p className="text-gray-700">{contact}</p>
                </div>

                <div className="flex space-x-4">
                    <Link to={`/UpdateDisaster/${_id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</Link>
                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button> */}
                    <button onClick={deleteDisaster}className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </div>
            </div>
        </div>
    );
};

