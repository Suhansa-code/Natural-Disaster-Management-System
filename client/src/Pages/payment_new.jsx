import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
import CheckoutForm from "./Components/disaster-funding/Checkout";
import BankSelector from "./Components/disaster-funding/Bank-Selector";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  "pk_test_51QyzW0F1MqlTWE7FVvTcRhf9uQFUPTOp9d3PdQ99tsftMm8mpJr71Eu8hohiAYUu3Ruf80xMXceVVzLrRIv1dZDG003Us4ou4b"
);

function App() {
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

  useEffect(() => {
    document.title = "Guardian Earth - Disaster Relief Fund";
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    if (!value.trim()) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const handleBranchChange = (e) => {
    const value = e.target.value;
    setDepositBranch(value);
    if (!value.trim()) {
      setbranchError("Branch is required");
    } else {
      setbranchError("");
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value < 100) {
      setAmountError("Minimum amount is $100");
    } else {
      setAmountError("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
      e.preventDefault();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const clearFields = () => {
    setFullName("");
    setBankName("");
    setDepositBranch("");
    setAmount("");
    setRemark("");
    setSelectedFiles([]);
    setMessage("");
    setNameError("");
    setbranchError("");
    setAmountError("");
  };

  const handleSubmit = async () => {
    if (
      !fullName ||
      !bankName ||
      !depositBranch ||
      !amount ||
      selectedFiles.length === 0
    ) {
      setMessage("Please fill in all required fields and upload bank slip");
      return;
    }

    if (amount < 100) {
      setMessage("Minimum amount is $100");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Payment submitted successfully!");
      clearFields();
    } catch (error) {
      toast.error("Failed to submit payment. Please try again.");
    } finally {
      setLoading(false);
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

              {/* Action Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-emerald-800/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-700/30 shadow-lg">
                  <Clock className="w-5 h-5 text-emerald-300 mb-2" />
                  <h3 className="text-sm font-semibold text-white mb-1">
                    24/7 Response
                  </h3>
                  <p className="text-xs text-emerald-200">Emergency Support</p>
                </div>

                <div className="bg-emerald-800/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-700/30 shadow-lg">
                  <Shield className="w-5 h-5 text-emerald-300 mb-2" />
                  <h3 className="text-sm font-semibold text-white mb-1">
                    Secure Aid
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Protected Distribution
                  </p>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={handleNameChange}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-0"
                      placeholder="Enter your full name"
                    />
                    {nameError && (
                      <p className="text-red-500 text-xs mt-1">{nameError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Bank
                    </label>
                    <BankSelector
                      bankName={bankName}
                      setBankName={setBankName}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Payment Slip
                    </label>
                    <div
                      className="border-2 border-dashed border-emerald-200 rounded-lg p-4 text-center cursor-pointer hover:border-emerald-400 transition-colors"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
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

                  {message && <p className="text-red-500 text-sm">{message}</p>}

                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      onClick={clearFields}
                      className="px-4 py-2 text-sm text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {loading ? "Processing..." : "Submit Payment"}
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

export default App;
