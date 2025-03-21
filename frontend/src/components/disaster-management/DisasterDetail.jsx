import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DisasterDetail(props) {
    const {
        _id,
        disasterType,
        severityLevel,
        description,
        images,
        Location,
        numberOfPeopleAffected,
        date,
        contact,
    } = props.disasters;
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

    // Function to format date as YYYY/MM/DD
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Adding leading zero for months < 10
        const day = String(dateObj.getDate()).padStart(2, '0'); // Adding leading zero for days < 10
        return `${year}/${month}/${day}`;
    };

    return (
        <div className="max-w-3xl mx-auto p-24 bg-gray rounded-lg shadow-lg ">
            <p className="text-3xl font-semibold text-gray-800 mb-6">View Disaster Details</p>
            <p className="text-gray-600 mb-6">Here are the details of the selected disaster. Please review the information below:</p>

            <div className="space-y-1">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold text-gray-700 mb-0.5 ">Disaster ID: {_id}</p>
                </div>

                <div className="flex justify-between">
                    <p className="text-lg font-semibold text-gray-700">Disaster Type:{disasterType}</p>
                </div>

                <div className="flex justify-between">
                    <p className="text-lg font-semibold text-gray-700">Severity Level: {severityLevel}</p>
                </div>

                <div className="flex justify-between">
                    <p className="text-lg font-semibold text-gray-700">Description: {description}</p>
                </div>    
                <div className="flex justify-between">
                    <p className="text-lg font-semibold text-gray-700">Location:* {Location} *</p>
                </div>

                <div className="flex justify-between">
                    <p className="text-lg font-semibold text-gray-700">Number of People Affected: {numberOfPeopleAffected}</p>
                </div>

                <div className="flex justify-between">
                    <p className="text-lg font-semibold text-gray-700">Date: {formatDate(date)}</p>
                </div>

                <div className="flex justify-between">
                    <p className="text-lg font-semibold text-gray-700">Contact Information: {contact}</p>
                </div>

                <div className="flex space-x-4 mt-6">
                    <Link to={`/UpdateDisaster/${_id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200">Update</Link>
                    <button onClick={deleteDisaster} className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200">Delete</button>
                </div>
            </div>
        </div>
    );
}
