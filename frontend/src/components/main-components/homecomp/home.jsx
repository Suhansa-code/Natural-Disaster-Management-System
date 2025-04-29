import React from 'react';
import Navigationbar from '../Navigationbar';
import Footer from '../footer';
import homeImage from '../../../assets/home.jpg';


const Home = () => {
    return (
        <>
            <Navigationbar />
          
            <div className="relative text-center p-12 bg-cover bg-center" >
                <div className="bg-opacity-50 p-10 rounded-lg  "style={{ backgroundImage: `url(${homeImage})`, backgroundSize: "cover", backgroundPosition: "center" }} >
                    <h1 className="text-4xl font-bold text-white mb-4">Welcome to the Natural Disaster Management System</h1>
                    <p className="text-lg text-white mb-6">Your one-stop solution for managing and responding to natural disasters.</p>
                    {/* <button className="px-6 py-2 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded transition">Get Started</button> */}
                </div>
            </div>

            {/* Features Section */}
            <div className="p-12 text-center">
                <h2 className="text-3xl font-semibold mb-6">Key Features</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 border rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Real-time Updates</h3>
                        <p>Stay informed with real-time disaster alerts and updates.</p>
                    </div>
                    <div className="p-6 border rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Emergency Services</h3>
                        <p>Connect with emergency responders quickly and efficiently.</p>
                    </div>
                    <div className="p-6 border rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">Community Support</h3>
                        <p>Collaborate with volunteers and organizations for relief efforts.</p>
                    </div>
                </div>
            </div>

            {/* Call-to-Action */}
            <div className="p-12 bg-gray-100 text-center">
                <h2 className="text-2xl font-bold mb-4">Join Us in Making a Difference</h2>
                <p className="mb-6">Sign up today to receive alerts and contribute to disaster response.</p>
                {/* <button className="px-6 py-2 text-lg bg-green-500 hover:bg-green-600 text-white rounded transition">Sign Up</button> */}
            </div>

            <Footer/>
        </>
    );
};

export default Home;
