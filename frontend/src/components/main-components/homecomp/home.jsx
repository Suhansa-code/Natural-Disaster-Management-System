import React from 'react';
import Navigationbar from '../Navigationbar'


const Home = () => {
    return (
        <>
        <Navigationbar />
        <div className="text-center p-12 ">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Natural Disaster Management System</h1>
            <p className="text-lg mb-6">Your one-stop solution for managing and responding to natural disasters.</p>
            
            <button className="px-6 py-2 text-lg bg-blue-500 text-white rounded">Get Started</button>
        </div>

        </> 
    );
};

export default Home;