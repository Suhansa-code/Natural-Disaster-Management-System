import React from 'react';
import { Link } from 'react-router-dom';

 

const Navigationbar = () => {
    return (
        <nav className="bg-blue-500 px-6 py-4">
            <ul className="flex space-x-8 justify-center">
                <li className="text-white">
                    <Link to="/">Home</Link>
                </li>
                <li className="text-white">
                    <Link to="/addDisaster">Add Disaster</Link>
                </li>
                <li className="text-white">
                    <Link to="/community">Community</Link>
                </li>
                <li className="text-white">
                    <Link to="/contact">Funding</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigationbar;