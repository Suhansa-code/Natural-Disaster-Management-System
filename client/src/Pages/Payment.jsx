import React, { useEffect, useState, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import uploadimg from "../assets/Icons/cloud-add.png";
import CheckoutForm from "../Components/disaster-funding/Checkout";
import toast from "react-hot-toast";
import earth_img from "../assets/Earth.webp";
import BankSelector from "../Components/disaster-funding/Bank-Selector";
import { AuroraBackground } from "../Components/ui/aurora-background";
import {
  AlertCircle,
  Globe,
  Users,
  DollarSign,
  Clock,
  Shield,
  Heart,
  MapPin,
  Calendar,
  X,
} from "lucide-react";

const stripePromise = loadStripe(
  "pk_test_51QyzW0F1MqlTWE7FVvTcRhf9uQFUPTOp9d3PdQ99tsftMm8mpJr71Eu8hohiAYUu3Ruf80xMXceVVzLrRIv1dZDG003Us4ou4b"
);

function Payment() {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fullName, setFullName] = useState("");
  const [bankName, setBankName] = useState("");
  const [depositBranch, setDepositBranch] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [nameError, setNameError] = useState("");
  const [branchError, setbranchError] = useState("");
  const [Amounterror, setAmountError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [disasters, setDisasters] = useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).filter((file) =>
      [".png", ".pdf"].includes(file.name.slice(-4).toLowerCase())
    );
    setSelectedFiles(files);
  };

  useEffect(() => {
    document.title = "Guardian Earth";

    const fetchDisasters = async () => {
      const response = await fetch("http://localhost:5000/api/disaster");
      const data = await response.json();
      setDisasters(data.disasters || []);
    };

    fetchDisasters();
  }, []);

  const handleSubmit = async () => {
    if (!fullName || !depositBranch || !bankName || !remark || !amount) {
      setMessage("All fields are required!");
      return;
    }
    // Checking the file uploaded
    if (selectedFiles.length === 0) {
      setMessage("No file selected. Please upload a file before proceeding.");
      return;
    }

    if (!nameError == "") {
      setMessage(nameError);
      return;
    } else if (!branchError == "") {
      setMessage(branchError);
      return;
    } else if (amount < 100 && amount) {
      setMessage(Amounterror);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/payment/verify-bank-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: fullName,
            email: "Pasinduh@inqube.com",
            amount: amount,
            bankname: bankName,
            branch: depositBranch,
            currency: "USD",
            slipImage: "sample",
          }),
        }
      );

      const result = await response.json();
      const payment_Id = result.paymentId;
      setLoading(false);

      if (response.ok) {
        //Sent Mail
        const responsemail = await fetch("http://localhost:5000/api/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: payment_Id,
            username: fullName,
            email: "Pasinduh@inqube.com",
            amount: amount,
            bankname: bankName,
            branch: depositBranch,
            currency: "USD",
            slipImage: "C://Users//admin//Downloads//Payment_Receipt (12).pdf",
          }),
        });

        const result = await responsemail.json();
        setLoading(false);

        toast.success("Payment submitted successfully!");
        // clearFields();
      } else {
        setMessage(result.error || "Something went wrong!");
      }
    } catch (error) {
      setLoading(false);
      setMessage("Error submitting payment. " + error);
      toast.error("Error submitting payment. " + error);
    }
  };

  const clearFields = () => {
    setFullName("");
    setBankName("");
    setDepositBranch("");
    setRemark("");
    setAmount("");
    setSelectedFiles([]);
  };
  // Name Validation Name
  const validateName = (fullName) => {
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    return nameRegex.test(fullName);
  };

  // Name Validation Branch
  const validateBranch = (depositBranch) => {
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    return nameRegex.test(depositBranch);
  };

  const validateAmount = (value) => {
    const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/; // Allows only numbers and up to 2 decimal places
    return amountRegex.test(value);
  };

  // Handle name Input Change
  const handleNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);

    if (!value) {
      setNameError("Name is required.");
    } else if (!validateName(value)) {
      setNameError("Only letters and spaces are allowed.");
    } else if (value.trim().length < 4) {
      setNameError("Name must be at least 4 characters long.");
    } else {
      if (message == nameError) {
        setMessage("");
      }
      setNameError("");
    }
  };

  // Handle Branch Input Change
  const handleBranchChange = (e) => {
    const value = e.target.value;
    setDepositBranch(value);

    if (!value) {
      setbranchError("Branch is required.");
    } else if (!validateBranch(value)) {
      setbranchError("Branch must contains Only letters and spaces.");
    } else if (value.trim().length < 4) {
      setbranchError("Branch must be at least 4 characters long.");
    } else {
      if (message == branchError) {
        setMessage("");
      }
      setbranchError("");
    }
  };

  const handleKeyDown = (e) => {
    if (["e", "E", "-", "+", ".", ",", "=", "/"].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Handle Amount Input Change
  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Prevent non-numeric input
    if (value < 100) {
      setAmountError("Amount must be a positive number and at least $100.");
      setAmount(value);
    } else if (!value === "" && validateAmount(value)) {
      setAmount(value);
      setAmountError(""); // Clear error if valid
      setMessage("");
    } else {
      setAmount(value);
      setAmountError("Please enter a valid positive number.");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className=" mx-auto px-4 sm:px-6 lg:px-4 py-4">
        <div className="flex gap-8 ">
          <AuroraBackground />
          {selectedDisaster ? (
            // Disaster Details View
            <div className="space-y-4 w-[500px] pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedDisaster.disasterType}
                </h2>
                <button
                  onClick={() => setSelectedDisaster(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="h-[150px] lg:rounded-l-xl overflow-hidden">
                  <img
                    src={selectedDisaster.images}
                    alt={`Map showing location of ${selectedDisaster.Location || "this disaster"}`}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600 mt-1" />
                  <div className="flex flex-col w-full text-left text-emerald-600">
                    <p className="text-[12px] font-semibold text-gray-700">
                      Disaster Date :
                    </p>
                    <p className="text-sm text-gray-700">
                      {new Date(selectedDisaster.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 mt-1" />
                  <div className="flex flex-col w-full text-left text-emerald-600">
                    <p className="text-[12px] font-semibold text-gray-700">
                      Location :
                    </p>
                    <p className="text-sm text-gray-700">
                      {selectedDisaster.Location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600 mt-1" />
                  <div className="flex flex-col w-full text-left text-emerald-600">
                    <p className="text-[12px] font-semibold text-gray-700">
                      People affected :
                    </p>
                    <p className="text-sm text-gray-700">
                      {selectedDisaster.numberOfPeopleAffected.toLocaleString()}{" "}
                      affected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600 mt-1" />
                  <div className="flex flex-col w-full text-left text-emerald-600">
                    <p className="text-[12px] font-semibold text-gray-700">
                      Severity Level :
                    </p>
                    <p className="text-sm text-gray-700">
                      {selectedDisaster.severityLevel}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4 px-1">
                <p className="text-sm text-gray-700 font-semibold text-left ">
                  Description
                </p>
                <p className="text-sm text-gray-700 text-left">
                  {selectedDisaster.description}
                </p>
              </div>
            </div>
          ) : (
            // Disaster List View
            <div className="space-y-4 w-[500px] pt-4 h-[calc(100vh-20px)] overflow-y-auto scrollbar-hide">
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900">
                  Disaster List
                </h2>
                <p className="text-[14px] font-normal text-gray-400">
                  Select a disaster to view details and make a donation.
                </p>
              </div>
              <div className="space-y-4">
                {disasters.map((disaster) => (
                  <div
                    key={disaster._id}
                    className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer bg-white"
                    onClick={() => setSelectedDisaster(disaster)}
                  >
                    {/* Disaster Header */}
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {disaster.disasterType}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          disaster.severityLevel === "High"
                            ? "bg-red-100 text-red-600"
                            : disaster.severityLevel === "Medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                        }`}
                      >
                        {disaster.severityLevel}
                      </span>
                    </div>

                    {/* Disaster Image */}
                    <div className="relative mt-3 h-[150px] rounded-lg overflow-hidden">
                      <img
                        src={disaster.images}
                        alt={`Image of ${disaster.disasterType}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-black/30 text-white text-xs px-2 py-1 rounded-br-lg">
                        {new Date(disaster.date).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Disaster Details */}
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <p className="text-[13px] w-[300px]  text-gray-600 text-left">
                          {disaster.Location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-600" />
                        <p className="text-[13px] text-gray-600">
                          {disaster.numberOfPeopleAffected.toLocaleString()}{" "}
                          affected
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Left Side - Disaster Details */}
          {/* <div className="space-y-6 w-[40%]">
            <div className="relative group">
              <div className="relative flex flex-row items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/90 to-emerald-700/90 backdrop-blur-xl shadow-2xl">
                <AuroraBackground />

                <div className="flex items-center justify-center min-h-screen">
                  <div className="relative px-8 py-4 pb-10">
                    <div className="flex flex-col items-center space-x-4 mb-8">
                      <div className="p-3 rounded-full bg-emerald-500/20 backdrop-blur-sm">
                        <AlertCircle className="w-10 h-10 text-emerald-300" />
                      </div>
                      <h2 className="text-3xl text-center font-semibold text-white tracking-tight">
                        Hurricane Katrina Relief
                      </h2>
                    </div>

                    <div></div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="space-y-1 flex flex-row items-center ">
                        <Calendar className="w-4 h-4 text-emerald-300" />

                        <div className="flex  flex-col items-center space-x-2 text-emerald-300">
                          <span className="text-xs uppercase tracking-wider text-left w-full ml-4">
                            Date
                          </span>
                          <p className="text-white text-[13px] font-normal w-full">
                            Aug 23–31, 2005
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1 flex flex-row items-center ">
                        <MapPin className="w-4 h-4 text-emerald-300" />

                        <div className="flex  flex-col items-center space-x-2 text-emerald-300">
                          <span className="text-xs uppercase tracking-wider text-left w-full ml-4">
                            Location
                          </span>
                          <p className="text-white text-[13px] font-normal w-full">
                            Louisiana, USA
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1 flex flex-row items-center ">
                        <Users className="w-4 h-4 text-emerald-300" />

                        <div className="flex  flex-col items-center space-x-2 text-emerald-300">
                          <span className="text-xs uppercase tracking-wider text-left w-full ml-4">
                            Impact
                          </span>
                          <p className="text-white text-[13px] font-normal w-full">
                            1,833 affected
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1 flex flex-row items-center ">
                        <DollarSign className="w-4 h-4 text-emerald-300" />

                        <div className="flex  flex-col items-center space-x-2 text-emerald-300">
                          <span className="text-xs uppercase tracking-wider text-left w-full ml-4">
                            Damages
                          </span>
                          <p className="text-white text-[13px] font-normal w-full">
                            $125 billion
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-emerald-300">
                        <Globe className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider">
                          Situation Overview
                        </span>
                      </div>
                      <p className="text-emerald-50/90 text-left text-sm leading-relaxed">
                        One of the deadliest hurricanes in U.S. history. The
                        storm caused catastrophic damage, particularly in New
                        Orleans where the levee system failed.
                      </p>
                    </div>

                    <div className="mt-8 space-y-2">
                      <div className="flex justify-between text-xs text-emerald-300">
                        <span>Relief Fund Progress</span>
                        <span>75%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-emerald-900/50 overflow-hidden">
                        <div className="h-full w-3/4 bg-emerald-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Right Side - Payment Form */}
          <div className="w-full border-l border-200 ">
            <div className="bg-white rounded-xl py-3   px-6 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col text-left">
                  <h2 className="text-[25px] font-semibold text-gray-900">
                    Make a Donation
                  </h2>
                  <p className="text-[14px] font-normal text-gray-400">
                    Your donation will help us provide emergency relief to
                    families affected by disasters
                  </p>
                </div>
                <div className="flex justify-center h-full items-center ">
                  <div className="bg-emerald-50 p-1 gap-1 rounded-lg inline-flex">
                    <button
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                        paymentMethod === "card"
                          ? "bg-emerald-600 text-white"
                          : "text-emerald-600 hover:bg-emerald-100"
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      Card Payment
                    </button>
                    <button
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                        paymentMethod === "bank"
                          ? "bg-emerald-600 text-white"
                          : "text-emerald-600 hover:bg-emerald-100"
                      }`}
                      onClick={() => setPaymentMethod("bank")}
                    >
                      Bank Transfer
                    </button>
                  </div>
                </div>
              </div>

              {paymentMethod === "card" ? (
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <div className="space-y-4 max-w-md  w-full ml-0 mr-auto mt-5">
                  <div className="mb-4 text-left">
                    <label className="block text-[12px] ml-3 font-semibold text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={handleNameChange}
                      placeholder="John Doe"
                      className="w-full p-3 h-9 rounded-lg border text-[14px] focus:ring-0 focus:border-1 outline-none border-border-border1  focus:border-primary-light bg-gray-0 dark:bg-gray-800 text-text-primary dark:text-text-dark"
                    />
                    {/* Error Message */}
                    {nameError && (
                      <p className="text-red-500 text-[12px] mt-1 pl-3">
                        {nameError}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 text-left">
                    <label className="block text-[12px] ml-3 font-semibold text-gray-700 mb-1">
                      Select Bank
                    </label>
                    <BankSelector
                      bankName={bankName}
                      setBankName={setBankName}
                    />
                  </div>

                  <div className="mb-4 text-left">
                    <label className="block text-[12px] ml-3 font-semibold text-gray-700 mb-1">
                      Amount (USD)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                      onKeyDown={handleKeyDown}
                      className="w-full px-3 py-2 text-sm border border-gray-200 outline-none rounded-lg focus:border-emerald-500 focus:ring-0"
                      placeholder="Minimum $100"
                      min="100"
                    />
                    {amount < 100 && amount && (
                      <p className="text-red-500 text-xs mt-1">{Amounterror}</p>
                    )}
                  </div>

                  <div className="flex flex-col w-full  h-full items-center space-y-3 mt-2   ">
                    <label className="block text-[12px] text-left w-full ml-3 font-semibold text-gray-700 mt-2">
                      Upload Payment Slip
                    </label>
                    {selectedFiles.length === 0 ? (
                      <div className="text-left w-full">
                        <div
                          className="border-2 border-dashed h-[120px] flex flex-col justify-center mx-[1px] items-center  border-emerald-200 rounded-lg p-4 text-center cursor-pointer hover:border-emerald-400 transition-colors"
                          onClick={() => fileInputRef.current.click()}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".png,.jpg,.pdf"
                          />
                          <p className="text-sm text-gray-600">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Supported formats: PNG, PDF
                          </p>
                        </div>
                      </div>
                    ) : (
                      <ul className="w-full h-full space-y-2 mt-4 top-0">
                        {selectedFiles.map((file, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center p-2 bg-[rgb(246,246,246)]  rounded-[4px] hover:bg-green-100 text-sm"
                          >
                            <span className="text-gray-700 text-left">
                              {file.name}
                            </span>
                            <button
                              onClick={() =>
                                setSelectedFiles(
                                  selectedFiles.filter((_, i) => i !== index)
                                )
                              }
                              className="text-red-500 hover:text-red-600"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {message && <p className="text-red-500 text-sm">{message}</p>}

                  <div className="flex space-x-3 w-full mt-5 justify-end">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-1 bg-primary-light text-white text-sm rounded-md hover:bg-hover-light"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      onClick={clearFields}
                      className="px-4 py-1 border border-gray-400 text-sm rounded-md hover:bg-gray-200"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
