import React, { useEffect, useState, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import uploadimg from "../assets/Icons/cloud-add.png";
import CheckoutForm from "../Components/disaster-funding/Checkout";
import toast from "react-hot-toast";
import earth_img from "../assets/Earth.webp";
import BankSelector from "../Components/disaster-funding/Bank-Selector";
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
} from "lucide-react";

const stripePromise = loadStripe(
  "pk_test_51QyzW0F1MqlTWE7FVvTcRhf9uQFUPTOp9d3PdQ99tsftMm8mpJr71Eu8hohiAYUu3Ruf80xMXceVVzLrRIv1dZDG003Us4ou4b"
);

function Payment() {
  useEffect(() => {
    document.title = "Guardian Earth";
  }, []);

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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).filter((file) =>
      [".png", ".pdf"].includes(file.name.slice(-4).toLowerCase())
    );
    setSelectedFiles(files);
  };

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
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Disaster Details */}
          <div className="space-y-6">
            <div className="relative group">
              {/* Main Card with Glassmorphism Effect */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/90 to-emerald-700/90 backdrop-blur-xl shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />

                {/* Content */}
                <div className="relative p-8">
                  {/* Header with Glow Effect */}
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 rounded-full bg-emerald-500/20 backdrop-blur-sm">
                      <AlertCircle className="w-6 h-6 text-emerald-300" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                      Hurricane Katrina Relief
                    </h2>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-emerald-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider">
                          Date
                        </span>
                      </div>
                      <p className="text-white font-medium">Aug 23–31, 2005</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-emerald-300">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider">
                          Location
                        </span>
                      </div>
                      <p className="text-white font-medium">Louisiana, USA</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-emerald-300">
                        <Users className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider">
                          Impact
                        </span>
                      </div>
                      <p className="text-white font-medium">1,833 affected</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-emerald-300">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider">
                          Damages
                        </span>
                      </div>
                      <p className="text-white font-medium">$125 billion</p>
                    </div>
                  </div>

                  {/* Overview Section */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-emerald-300">
                      <Globe className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider">
                        Situation Overview
                      </span>
                    </div>
                    <p className="text-emerald-50/90 text-sm leading-relaxed">
                      One of the deadliest hurricanes in U.S. history. The storm
                      caused catastrophic damage, particularly in New Orleans
                      where the levee system failed.
                    </p>
                  </div>

                  {/* Progress Bar */}
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

              {/* Floating Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <Users className="w-5 h-5 text-emerald-300 mb-2" />
                  <div className="text-2xl font-bold text-white">2M+</div>
                  <p className="text-xs text-emerald-200">People Helped</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <Globe className="w-5 h-5 text-emerald-300 mb-2" />
                  <div className="text-2xl font-bold text-white">50+</div>
                  <p className="text-xs text-emerald-200">Countries</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <DollarSign className="w-5 h-5 text-emerald-300 mb-2" />
                  <div className="text-2xl font-bold text-white">$125M</div>
                  <p className="text-xs text-emerald-200">Distributed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-center mb-6">
                <div className="bg-emerald-50 p-1 rounded-lg inline-flex">
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

              {paymentMethod === "card" ? (
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="mb-4 text-left">
                    <label className="block text-sm ml-3 font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={handleNameChange}
                      placeholder="John Doe"
                      className="w-full p-3 h-10 rounded-[4px] border text-[14px] focus:ring-0 focus:border-1 outline-none border-border-border1  focus:border-primary-light bg-gray-0 dark:bg-gray-800 text-text-primary dark:text-text-dark"
                    />
                    {/* Error Message */}
                    {nameError && (
                      <p className="text-red-500 text-[12px] mt-1 pl-3">
                        {nameError}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 text-left">
                    <label className="block text-sm ml-3 font-medium text-gray-700 mb-1">
                      Select Bank
                    </label>
                    <BankSelector
                      bankName={bankName}
                      setBankName={setBankName}
                    />
                  </div>

                  <div className="mb-4 text-left">
                    <label className="block text-sm ml-3 font-medium text-gray-700 mb-1">
                      Amount (USD)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                      onKeyDown={handleKeyDown}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-0"
                      placeholder="Minimum $100"
                      min="100"
                    />
                    {amount < 100 && amount && (
                      <p className="text-red-500 text-xs mt-1">{Amounterror}</p>
                    )}
                  </div>

                  <div className="flex flex-col w-full  h-full items-center space-y-3 mt-2   ">
                    <label className="block text-sm font-medium ml-3 text-left  w-full text-gray-700 ">
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
