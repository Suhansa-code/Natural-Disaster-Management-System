import React from 'react';

const Footer = () => {
    return (
        <footer className="p-6 bg-gray-800 text-white text-center">
            <p>&copy; {new Date().getFullYear()} Natural Disaster Management System. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
