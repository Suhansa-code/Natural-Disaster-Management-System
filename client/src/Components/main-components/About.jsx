import React from "react";
import aboutImage from "./../../assets/home.jpg";

const AboutUs = () => {
  return (
    <>
      <div
        className="relative text-center p-12 bg-cover bg-center"
        style={{
          backgroundImage: `url(${aboutImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-opacity-50 p-10 rounded-lg">
          <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
          <p className="text-lg text-white mb-6">
            Learn more about our mission, vision, and the dedicated team behind
            the Natural Disaster Management System.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="p-12 text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Mission & Vision</h2>
        <p className="text-lg mb-6">
          To build a resilient and prepared world where technology and
          innovation empower communities to effectively prevent, mitigate, and
          recover from natural disasters, ensuring minimal loss of life and
          infrastructure.
        </p>
      </div>

      {/* Team Section */}
      <div className="p-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Jane Smith</h3>
            <p>Head of Operations</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Michael Brown</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Be a Part of Our Journey</h2>
        <p className="mb-6">
          Join us in making disaster management more effective and accessible.
        </p>
      </div>
    </>
  );
};

export default AboutUs;
