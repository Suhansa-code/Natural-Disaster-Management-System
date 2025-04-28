import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import world_globe from "../../../assets/world_globe.png";
import {
  AlertTriangle,
  MapPin,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  NotebookPen,
} from "lucide-react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeEmergency, setActiveEmergency] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const emergencyTypes = [
    { id: "flood", name: "Flood", icon: "fa-water" },
    { id: "fire", name: "Fire", icon: "fa-fire" },
    { id: "earthquake", name: "Earthquake", icon: "fa-house-crack" },
    { id: "hurricane", name: "Hurricane", icon: "fa-wind" },
  ];
  return (
    <div className="min-h-screen bg-white relative">
      {/* Grid Background */}
      <div className="absolute inset-0 z-10 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
      linear-gradient(to left, #22c55e 1px, transparent 1px), 
      linear-gradient(to top, #22c55e 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            WebkitMaskImage:
              "linear-gradient(to left, black 10%, transparent 100%)",
            maskImage: "linear-gradient(to left, black 10%, transparent 90%)",
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex text-left items-center pt-20 pb-16">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://public.readdy.ai/ai/img_res/acfbcfdd59af98f904af9594fdea3678.jpg"
            alt="Disaster Management Center"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30"></div>
        </div>
        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center select-none">
          <div className="w-full md:w-1/2 text-gray-900 mb-10 md:mb-0">
            <div className="relative mb-6">
              <span className="absolute -top-8 left-0 bg-green-100 text-green-500 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                Next-Gen Technology
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                Disaster{" "}
                <span className="text-green-500">
                  <br />
                  Management{" "}
                </span>
                <br />
                Solutions
              </h1>
            </div>
            <p className="text-sm md:text-[16px] text-gray-600 max-w-xl mb-10 leading-relaxed">
              Advanced 3D technology and real-time monitoring systems to
              predict, prepare for, and respond to natural disasters with
              unprecedented efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-500 hover:bg-green-600 z-10 w-[200px] h-[38px]  justify-center text-white px-2 py-3 rounded-md transition-all duration-300 text-[15px] font-normal !rounded-button whitespace-nowrap cursor-pointer shadow-md flex items-center">
                <FaBolt className="mr-2" /> Emergency Response
              </button>
              <button className="bg-white hover:bg-gray-50 w-[160px] h-[38px] gap-2 flex flex-row justify-center text-gray-800 border border-gray-200 px-[14px] py-3 rounded-md transition-all duration-300 text-[15px] font-normal !rounded-button whitespace-nowrap cursor-pointer shadow-md  items-center group">
                <span>View Resources</span>
                <FaArrowRight className=" transition-transform group-hover:translate-x-[2px] duration-100 mt-[0.5px] mx-[5px]" />
              </button>
            </div>
            <div className="mt-20 flex items-center">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-white shadow-sm">
                  <FaUserShield className="text-blue-500 text-xs" />
                </div>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center border border-white shadow-sm">
                  <FaUserShield className="text-green-500 text-xs" />
                </div>
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center border border-white shadow-sm">
                  <FaUserShield className="text-yellow-500 text-xs" />
                </div>
              </div>
              <span className="ml-3 text-[13px] text-gray-400">
                Trusted by 200+ emergency response teams worldwide
              </span>
            </div>
          </div>

          <img
            src={world_globe}
            alt="3D Disaster Monitoring System"
            className="absolute w-32 h-32 right-[10%] top-[20%] blur-[6px] opacity-75 -mt-14 object-cover animate-spin-slow"
          />

          <img
            src={world_globe}
            alt="3D Disaster Monitoring System"
            className="absolute w-40 h-40 right-[38%] bottom-[20%] blur-[10px] opacity-85 -mt-14 object-cover animate-spin-slow"
          />

          <img
            src={world_globe}
            alt="3D Disaster Monitoring System"
            className="absolute w-32 h-32 right-[10%] bottom-[20%] blur-[30px] opacity-100 -mt-14 object-cover animate-spin-slow"
          />

          <img
            src={world_globe}
            alt="3D Disaster Monitoring System"
            className="absolute w-32 h-32 left-[0%] bottom-[30%] z-0 blur-[30px] opacity-100 -mt-14 object-cover animate-spin-slow"
          />

          <img
            src={world_globe}
            alt="3D Disaster Monitoring System"
            className="absolute w-16 h-16 left-[18%] top-[18%] z-0 blur-[10px] opacity-40 -mt-14 object-cover animate-spin-slow"
          />

          <div className="absolute top-[25%] right-[5%] z-30">
            <div
              className="flex items-center gap-4 h-[60px]  px-2 py-4 bg-white/20 backdrop-blur-[10px] 
                        rounded-[12px] shadow-xl border border-white/10 text-white w-[200px]"
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full shadow-sm">
                <ShieldCheck className="w-6 h-6 text-green-500 animate-bounce mt-2" />
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <div className="text-2xl font-bold text-green-400 leading-none">
                  98%
                </div>
                <p className="text-sm text-gray-700 mt-1">Accuracy Rate</p>
              </div>
            </div>
          </div>

          <div
            className="absolute flex items-center gap-4 p-4 bg-white/20 backdrop-blur-[10px] 
                        rounded-[12px] shadow-xl border border-white/10 bottom-[18%] right-[10%] z-30 
                         w-[250px] h-[70px]"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 bg-red-100/30 rounded-full shadow-md animate-ping">
              <AlertTriangle className="text-red-500 w-6 h-6" />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <div className="text-lg font-semibold text-red-600">
                Disaster Alert
              </div>
              <p className="text-sm text-gray-700">High Risk Zone</p>
            </div>
          </div>

          <div className="absolute top-[35%] right-[35%] z-30">
            <div className="flex items-center gap-4 h-[70px] px-4 py-4 bg-white/20 backdrop-blur-[10px] rounded-[12px] shadow-xl border border-white/10 text-black w-auto">
              {/* Icon Container */}
              <div className="flex items-center justify-center w-11 h-11 bg-yellow-500/20 rounded-full shadow-md animate-pulse">
                <AlertCircle className="text-yellow-500 w-8 h-8" />
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <div className="text-[18px] font-semibold text-yellow-400">
                  Warning
                </div>
                <p className="text-sm text-gray-800 mt-1">High Risk Zone</p>
              </div>
            </div>
          </div>

          <div className="absolute top-[15%] right-[30%] z-30 animate-bounce">
            <div className="flex items-center bg-white/20 backdrop-blur-[10px] rounded-full shadow-xl border border-white/10 text-black ">
              {/* Icon Container */}
              <div className="flex items-center justify-center w-11 h-11 bg-blue-500/10 rounded-full shadow-md">
                <AlertCircle className="text-blue-500 w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-[25%] right-[40%] z-30 animate-bounce">
            <div className="flex items-center bg-white/20 backdrop-blur-[10px] rounded-full shadow-xl border border-white/10 text-black ">
              {/* Icon Container */}
              <div className="flex items-center justify-center w-11 h-11 bg-green-500/10 rounded-full shadow-md">
                <ShieldCheck className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-auto h-full max-w-[800px] max-h-[800px] relative">
                <img
                  src={world_globe}
                  alt="3D Disaster Monitoring System"
                  className="w-full h-Auto -mt-14 object-cover animate-spin-slow"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[90%] h-[90%] border-2 border-green-200 rounded-full animate-pulse opacity-50"></div>
                  <div className="absolute w-[70%] h-[70%] border border-green-300 rounded-full animate-ping opacity-30"></div>
                </div>
              </div>
            </div>
            <style jsx>{`
              @keyframes spin-slow {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
              .animate-spin-slow {
                animation: spin-slow 80s linear infinite;
              }
            `}</style>
          </div>
        </div>
      </section>
      {/* Emergency Types Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Emergency Response Types
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Our advanced systems are designed to handle various types of
              natural disasters with precision and efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {emergencyTypes.map((type) => (
              <div
                key={type.id}
                className={`p-6 rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer border ${activeEmergency === type.id ? "border-green-500 bg-white shadow-md" : "border-gray-100 bg-white"}`}
                onClick={() => setActiveEmergency(type.id)}
              >
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <i className={`fas ${type.icon} text-green-500 text-xl`}></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {type.name} Response
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  Specialized protocols and technologies for effective{" "}
                  {type.name.toLowerCase()} disaster management.
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-4xl h-[300px] relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://public.readdy.ai/ai/img_res/6382a75a18793624d3e91e3ad9ff938b.jpg"
                alt="3D Emergency Response System"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* 3D Visualization Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Advanced 3D Visualization
              </h2>
              <p className="text-base text-gray-600 mb-6">
                Our cutting-edge 3D modeling technology allows emergency
                responders to visualize disaster scenarios in real-time,
                improving decision-making and resource allocation.
              </p>
              <div className="space-y-4 text-left">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                    <MapPin className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Real-time Mapping
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Accurate geographical representation of affected areas
                      with live updates.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                    <TrendingUp className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Predictive Analytics
                    </h3>
                    <p className="text-gray-600 text-sm">
                      AI-powered predictions to anticipate disaster progression
                      and impact.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                    <NotebookPen className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Evacuation Planning
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Optimized evacuation routes based on real-time conditions
                      and infrastructure status.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-100">
                <img
                  src="https://public.readdy.ai/ai/img_res/d3d283c2041b8faeba120e21432b42da.jpg"
                  alt="3D Visualization System"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Statistics Section */}
      <section className="py-16 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-4xl font-bold mb-2 text-green-500">98%</div>
              <p className="text-sm text-gray-600">Accuracy Rate</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-4xl font-bold mb-2 text-green-500">
                15min
              </div>
              <p className="text-sm text-gray-600">Average Response Time</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-4xl font-bold mb-2 text-green-500">500+</div>
              <p className="text-sm text-gray-600">Disasters Managed</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-4xl font-bold mb-2 text-green-500">24/7</div>
              <p className="text-sm text-gray-600">Monitoring & Support</p>
            </div>
          </div>
        </div>
      </section>
      {/* Technology Showcase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Cutting-Edge Technology
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Our disaster management platform integrates the latest
              technologies to provide comprehensive emergency response
              solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden shadow-sm border border-gray-100 group bg-white">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://public.readdy.ai/ai/img_res/06c0bef86cbfde1e953fd3fbce5296fc.jpg"
                  alt="AI Prediction Systems"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  AI Prediction Systems
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Machine learning algorithms that analyze historical data and
                  environmental factors to predict disaster occurrences and
                  severity.
                </p>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-600 font-medium inline-flex items-center text-sm"
                >
                  Learn more <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-sm border border-gray-100 group bg-white">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://public.readdy.ai/ai/img_res/ae00a2f17fcd0507b0e13be2a3462a8a.jpg"
                  alt="Drone & Satellite Network"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Drone & Satellite Network
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Comprehensive aerial monitoring system that provides real-time
                  imagery and data from disaster-affected areas.
                </p>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-600 font-medium inline-flex items-center text-sm"
                >
                  Learn more <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-sm border border-gray-100 group bg-white">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://public.readdy.ai/ai/img_res/4e4e1add0d54ed3e5ad7267026bc0b2f.jpg"
                  alt="Mobile Command Centers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Mobile Command Centers
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Deployable units equipped with advanced communication systems
                  and technology for on-site disaster management.
                </p>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-600 font-medium inline-flex items-center text-sm"
                >
                  Learn more <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-4xl h-[350px] relative rounded-lg overflow-hidden shadow-md border border-gray-100">
              <img
                src="https://public.readdy.ai/ai/img_res/77a0badf5912ca9a70a4a97ea2488675.jpg"
                alt="Integrated Technology Ecosystem"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <i className="fas fa-quote-left text-3xl text-green-100 mb-4"></i>
            <p className="text-lg text-gray-700 mb-6">
              "DisasterShield's 3D visualization technology has revolutionized
              how we respond to emergencies. The predictive capabilities and
              real-time monitoring have saved countless lives during recent
              natural disasters."
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-user-tie text-green-500 text-lg"></i>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">
                  Dr. Michael Chen
                </h4>
                <p className="text-gray-600 text-xs">
                  Director, National Emergency Response Center
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="absolute inset-0 z-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(to right, #22c55e 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Ready to enhance your disaster response?
                </h2>
                <p className="text-gray-600 text-base max-w-xl">
                  Join thousands of organizations worldwide using our advanced
                  3D disaster management platform.
                </p>
              </div>
              <div>
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md transition-all duration-300 text-base font-medium shadow-md !rounded-button whitespace-nowrap cursor-pointer">
                  Request a Demo
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-4xl h-[250px] relative rounded-lg overflow-hidden shadow-md border border-gray-100">
              <img
                src="https://public.readdy.ai/ai/img_res/6f8cf31b00b6141f02306fc02796ae44.jpg"
                alt="3D Disaster Management Platform"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-white text-gray-800 py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <i className="fas fa-shield-alt text-green-500 text-xl mr-2"></i>
                <span className="font-semibold text-base">DisasterShield</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Advanced 3D disaster management solutions for a safer world.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-500 hover:text-green-500 transition-colors duration-300 cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-green-500 transition-colors duration-300 cursor-pointer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-green-500 transition-colors duration-300 cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-green-500 transition-colors duration-300 cursor-pointer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    Flood Management
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    Fire Response
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    Earthquake Monitoring
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    Hurricane Tracking
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    Tsunami Warning Systems
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    Partners
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    Emergency Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    Training Programs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    Research Papers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    Webinars
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-xs hover:text-green-500 transition-colors duration-300 cursor-pointer"
                  >
                    API Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-8 pt-6 text-center md:flex md:justify-between md:text-left">
            <p className="text-gray-500 text-xs mb-4 md:mb-0">
              © 2025 DisasterShield. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end space-x-6">
              <a
                href="#"
                className="text-gray-500 text-xs hover:text-green-500 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 text-xs hover:text-green-500 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 text-xs hover:text-green-500 transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Home;
