import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { Droplet, Flame, Earth, Wind } from "lucide-react";
import world_globe from "../../../assets/world_globe.png";
import EmergencyResponseSection from "./EmergencyResponseSection";
import disasterimg1 from "../../../assets/disasternobg1.png";
import AIprediction from "../../../assets/AIprediction.png";
import droneimage from "../../../assets/droneimage.png";
import mobileCommandimage from "../../../assets/mobileCommandimage.png";
import { ArrowRight } from "lucide-react";
import { Quote, User } from "lucide-react";
import {useNavigate } from "react-router-dom";

import {
  AlertTriangle,
  MapPin,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  NotebookPen,
} from "lucide-react";
import StatsSection from "./StatSection";
import Footer from "./footer";
import { use } from "react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeEmergency, setActiveEmergency] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  
  const navigate = useNavigate();
  };
  const handleClick = ()=> {
    navigate('/flood-predictor')
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
    {
      id: "flood",
      name: "Flood",
      icon: Droplet,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      id: "fire",
      name: "Fire",
      icon: Flame,
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      id: "earthquake",
      name: "Earthquake",
      icon: Earth,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: "hurricane",
      name: "Hurricane",
      icon: Wind,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ];

  const stats = [
    { value: "98%", label: "Accuracy Rate" },
    { value: "15min", label: "Average Response Time" },
    { value: "500+", label: "Disasters Managed" },
    { value: "24/7", label: "Monitoring & Support" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

 

  return (
    <>
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
        <section className="relative min-h-screen flex text-left items-center pt-20 pb-4">
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
                <button onClick = {handleClick} className="bg-green-500 hover:bg-green-600 z-10 w-[200px] h-[38px]  justify-center text-white px-2 py-3 rounded-md transition-all duration-300 text-[15px] font-normal !rounded-button whitespace-nowrap cursor-pointer shadow-md flex items-center">
                  <FaBolt className="mr-2" /> Disaster Early Warning
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
        <section className="py-8 bg-white relative overflow-hidden">
          <EmergencyResponseSection
            emergencyTypes={emergencyTypes}
            activeEmergency={activeEmergency}
            setActiveEmergency={setActiveEmergency}
          />
        </section>
        {/* 3D Visualization Section */}
        <section className="py-[68px] h-auto  relative overflow-hidden">
          <div className="container mx-auto h-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h2 className="text-[24px] font-bold text-gray-900 mb-4 text-left">
                  Advanced 3D Visualization
                </h2>
                <p className="text-[15px] text-gray-600 mb-6 text-left">
                  Our cutting-edge 3D modeling technology allows emergency
                  responders to visualize disaster scenarios in real-time,
                  improving decision-making and resource allocation.
                </p>
                <div className="space-y-8 text-left mt-12">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-5">
                      <MapPin className="text-green-500 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-semibold text-gray-900 mb-1">
                        Real-time Mapping
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Accurate geographical representation of affected areas
                        with live updates.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-5">
                      <TrendingUp className="text-green-500 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-semibold text-gray-900 mb-1">
                        Predictive Analytics
                      </h3>
                      <p className="text-gray-600 text-sm">
                        AI-powered predictions to anticipate disaster
                        progression and impact.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-5">
                      <NotebookPen className="text-green-500 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-semibold text-gray-900 mb-1">
                        Evacuation Planning
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Optimized evacuation routes based on real-time
                        conditions and infrastructure status.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-full md:w-1/2 relative ">
                <div className="absolute inset-0 flex justify-center items-center ">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={disasterimg1}
                      alt="3D Visualization System"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Statistics Section */}
        <StatsSection className="z-50" />
        {/* Technology Showcase */}
        <section className="py-8 bg-white">
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
              <div className="rounded-lg flex flex-col justify-between items-center overflow-hidden shadow-sm  hover:shadow-md transition-all duration-300 z-30 border border-gray-100 group bg-white">
                <div>
                  <div className="h-56 overflow-hidden w-full">
                    <img
                      src={AIprediction}
                      alt="AI Prediction Systems"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      AI Prediction Systems
                    </h3>
                    <p className="text-gray-600 text-sm ">
                      Machine learning algorithms that analyze historical data
                      and environmental factors to predict disaster occurrences
                      and severity.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedFeature("ai");
                    setIsOpen(true);
                  }}
                  className="text-green-500 hover:text-green-600 my-3 duration-300 font-normal inline-flex items-center text-sm"
                >
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </button>{" "}
              </div>
              <div className="rounded-lg flex flex-col justify-between items-center overflow-hidden shadow-sm border  hover:shadow-md transition-all duration-300 z-30 border-gray-100 group bg-white">
                <div>
                  <div className="h-56 overflow-hidden w-full">
                    <img
                      src={droneimage}
                      alt="Drone & Satellite Network"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Drone & Satellite Network
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Comprehensive aerial monitoring system that provides
                      real-time imagery and data from disaster-affected areas.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedFeature("drone");
                    setIsOpen(true);
                  }}
                  className="text-green-500 hover:text-green-600 my-3 duration-300 font-normal inline-flex items-center text-sm"
                >
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
              <div className="rounded-lg flex flex-col justify-between items-center overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 z-30 border border-gray-100 group bg-white ">
                <div>
                  <div className="h-56 overflow-hidden w-full ">
                    <img
                      src={mobileCommandimage}
                      alt="Mobile Command Centers"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Mobile Command Centers
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Deployable units equipped with advanced communication
                      systems and technology for on-site disaster management.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedFeature("mobile");
                    setIsOpen(true);
                  }}
                  className="text-green-500 hover:text-green-600 my-3 duration-300 font-normal inline-flex items-center text-sm"
                >
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonial Section */}
        <section className="relative z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          {/* Top Wave */}
          <div className="mt-0">
            <svg
              className="w-full h-[80px] text-white"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="currentColor"
                d="M0,192L60,181.3C120,171,240,149,360,138.7C480,128,600,128,720,144C840,160,960,192,1080,186.7C1200,181,1320,139,1380,117.3L1440,96V0H0Z"
              />
            </svg>
          </div>

          {/* Main Content */}
          <div className="relative z-50 py-14 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center bg-white/5 p-10 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md z-50">
                <Quote className="text-4xl text-green-400 mb-6 mx-auto" />
                <p className="text-xl text-slate-100 font-normal mb-8 leading-relaxed">
                  "Disaster 3D visualization technology has revolutionized how
                  we respond to emergencies. The predictive capabilities and
                  real-time monitoring have saved countless lives during recent
                  natural disasters."
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center">
                    <User className="text-green-400 w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-white text-lg">
                      Dr. Michael Chen
                    </h4>
                    <p className="text-sm text-slate-300">
                      Director, National Emergency Response Center
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="">
            <svg
              className="w-full h-[80px] text-white"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="currentColor"
                d="M0,160L60,144C120,128,240,96,360,117.3C480,139,600,213,720,224C840,235,960,181,1080,154.7C1200,128,1320,128,1380,117.3L1440,107V320H0Z"
              />
            </svg>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white relative overflow-hidden border-t border-gray-100">
          {/* Grid Background */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(to right, #4ade80 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Text */}
                <div className="text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
                    Ready to enhance your disaster response?
                  </h2>
                  <p className="text-sm text-slate-300 max-w-xl">
                    Join global organizations using our 3D disaster management
                    platform for faster, smarter response and planning.
                  </p>
                </div>

                {/* Button */}
                <div>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-all duration-300 text-sm font-medium shadow-md whitespace-nowrap">
                    Visit Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="z-50 relative border-t border-gray-100 bottom-0 w-full">
          <Footer />
        </section>
      </div>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-lg p-6 shadow-lg relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            {selectedFeature === "ai" && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  AI Prediction Systems
                </h2>
                <p className="text-sm text-gray-700 mb-2">
                  Machine learning algorithms that analyze historical and
                  environmental data to predict disasters before they happen.
                  These systems help in issuing early warnings and making better
                  preparedness plans.
                </p>
              </>
            )}
            {selectedFeature === "drone" && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Drone & Satellite Network
                </h2>
                <p className="text-sm text-gray-700 mb-2">
                  Our aerial systems provide real-time imagery and situational
                  updates from affected zones, improving situational awareness
                  and coordination.
                </p>
              </>
            )}
            {selectedFeature === "mobile" && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Mobile Command Centers
                </h2>
                <p className="text-sm text-gray-700 mb-2">
                  Fully equipped mobile units that serve as operational hubs
                  during emergencies. They include communication, coordination,
                  and surveillance tools.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
