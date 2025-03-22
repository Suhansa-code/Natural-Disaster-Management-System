import { useEffect, useState } from "react";
import { FaUsers, FaGlobe, FaHandsHelping, FaRegHeart } from "react-icons/fa";

export default function AboutUs() {
  const [stats, setStats] = useState({ livesSaved: 0, disastersManaged: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        livesSaved: Math.floor(Math.random() * 10000) + 50000,
        disastersManaged: Math.floor(Math.random() * 500) + 100,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-orange-200 text-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center bg-cover bg-fixed"
           style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?rescue,disaster')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="text-5xl font-bold text-white z-10 text-center px-4">
          Together, We Rebuild Lives.
        </h1>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-5xl mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
        <p className="text-lg">
        To build a resilient and prepared world where technology and innovation empower 
        communities to effectively prevent, mitigate, and recover from natural disasters, 
        ensuring minimal loss of life and infrastructure.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center py-10 bg-blue-500 text-white">
        <div className="p-4">
          <FaRegHeart className="text-5xl mx-auto mb-2"/>
          <h3 className="text-2xl font-bold">{stats.livesSaved}+</h3>
          <p>Lives Saved</p>
        </div>
        <div className="p-4">
          <FaGlobe className="text-5xl mx-auto mb-2"/>
          <h3 className="text-2xl font-bold">{stats.disastersManaged}+</h3>
          <p>Disasters Managed</p>
        </div>
        <div className="p-4">
          <FaHandsHelping className="text-5xl mx-auto mb-2"/>
          <h3 className="text-2xl font-bold">1200+</h3>
          <p>Volunteers</p>
        </div>
        <div className="p-4">
          <FaUsers className="text-5xl mx-auto mb-2"/>
          <h3 className="text-2xl font-bold">500+</h3>
          <p>Communities Helped</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-5xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow-lg rounded-lg text-center hover:scale-105 transition">
            <h3 className="text-xl font-bold">Suhansa Kashmira</h3>
            <p>Director of Disaster Management</p>
          </div>
          <div className="bg-white p-4 shadow-lg rounded-lg text-center hover:scale-105 transition">
            <h3 className="text-xl font-bold">Pasindu</h3>
            <p>Head of Technology</p>
          </div>
          <div className="bg-white p-4 shadow-lg rounded-lg text-center hover:scale-105 transition">
            <h3 className="text-xl font-bold">Damsara Sudasinghe</h3>
            <p>Operations Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}
