import React, { useEffect, useState, useRef, useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import uploadimg from "../assets/Icons/cloud-add.png";
import CheckoutForm from "../Components/disaster-funding/Checkout";
import toast from "react-hot-toast";
import earth_img from "../assets/Earth.webp";
import BankSelector from "../Components/disaster-funding/Bank-Selector";
import { AuroraBackground } from "../Components/ui/aurora-background";
import { AuthContext } from "../context/AuthContext";
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
  BadgeCheck,
  XCircle,
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [nameError, setNameError] = useState("");
  const [branchError, setbranchError] = useState("");
  const [Amounterror, setAmountError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [disasters, setDisasters] = useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [payments, setPayments] = useState([]);
  const [SlipImage, setSlipImage] = useState("");

  const { user } = useContext(AuthContext);
  const user_ID = user?.id;

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).filter((file) =>
      [".png", ".pdf"].includes(file.name.slice(-4).toLowerCase())
    );
    setSelectedFiles(files);
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/payment/user/${user_ID}`
      );
      const data = await response.json();
      setPayments(data.payments || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshPayments = () => {
    fetchPayments();
  };

  useEffect(() => {
    document.title = "Guardian Earth";

    const fetchDisasters = async () => {
      const response = await fetch("http://localhost:5000/api/disaster");
      const data = await response.json();
      setDisasters(data.disasters || []);
    };

    if (user_ID) {
      fetchPayments();
    }
    fetchDisasters();
  }, [user_ID]);

  const clearFields = () => {
    setFullName("");
    setBankName("");
    setDepositBranch("");
    setAmount("");
    setSelectedFiles([]);
    setNameError("");
    setbranchError("");
    setAmountError("");
    setMessage("");
  };

  const handleSubmit = async () => {
    if (!user_ID) {
      setMessage("User not logged in.");
      toast.error("User not logged in.");
      return;
    }

    if (!fullName || !depositBranch || !bankName || !amount) {
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
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });

      let fileName = "";

      try {
        const response = await fetch("http://localhost:5000/api/uploadfile", {
          // Updated endpoint
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.url) {
          console.log("File uploaded successfully:", data.url);
          fileName = data.url;
        } else {
          toast.error("Failed to upload file.");
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file.");
        setLoading(false);
        return;
      }

      if (!fileName) {
        toast.error("File upload failed. Please try again.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/payment/verify-bank-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_ID,
            username: fullName,
            email: "Pasinduh@inqube.com",
            amount: amount,
            bankname: bankName,
            branch: depositBranch,
            currency: "USD",
            slipImage: fileName,
          }),
        }
      );

      const result = await response.json();
      const payment_Id = result.paymentId;

      if (response.ok) {
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
            slipImage: fileName,
          }),
        });

        const emailResult = await responsemail.json();

        if (responsemail.ok) {
          toast.success("Payment submitted and email sent successfully!");
          clearFields();
          refreshPayments();
        } else {
          toast.error(emailResult.error || "Failed to send email.");
        }
      } else {
        setMessage(result.error || "Something went wrong!");
      }
    } catch (error) {
      setLoading(false);
      setMessage("Error submitting payment. " + error);
      toast.error("Error submitting payment. " + error);
    } finally {
      setLoading(false);
      setMessage("");
    }
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
        <div className="flex gap-5 ">
          <AuroraBackground />
          <div className=" min-w-[350px] w-[350px]">
            {selectedDisaster ? (
              // Disaster Details View
              <div className="space-y-4 w-full pt-4">
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
              <div className="space-y-4 w-full pt-4 h-[calc(100vh-20px)] overflow-y-auto scrollbar-hide">
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
          </div>
          {/* Left Side - Disaster Details */}

          {/* Right Side - Payment Form */}
          <div className="w-full border-l border-gray-100 ">
            <div className="bg-white rounded-xl py-3   px-6 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col text-left">
                  <h2 className="text-[25px] font-semibold text-gray-900">
                    Make a Donation
                  </h2>
                  <p className="text-[14px] font-normal text-gray-400 text-wrap w-[450px]">
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
              <div className="flex">
                <div className=" w-full">
                  {paymentMethod === "card" ? (
                    <Elements stripe={stripePromise}>
                      <CheckoutForm refreshPayments={refreshPayments} />
                    </Elements>
                  ) : (
                    <div className="space-y-4  w-full ml-0 pr-6 mr-auto mt-5 ">
                      <div className="mb-4 text-left ">
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
                          Branch Name
                        </label>
                        <input
                          type="text"
                          value={depositBranch}
                          onChange={handleBranchChange}
                          placeholder="Galle Road Branch"
                          className="w-full p-3 h-9 rounded-lg border text-[14px] focus:ring-0 focus:border-1 outline-none border-border-border1  focus:border-primary-light bg-gray-0 dark:bg-gray-800 text-text-primary dark:text-text-dark"
                        />
                        {/* Error Message */}
                        {branchError && (
                          <p className="text-red-500 text-[12px] mt-1 pl-3">
                            {branchError}
                          </p>
                        )}
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
                          <p className="text-red-500 text-xs mt-1">
                            {Amounterror}
                          </p>
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
                                      selectedFiles.filter(
                                        (_, i) => i !== index
                                      )
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

                      {message && (
                        <p className="text-red-500 text-sm">{message}</p>
                      )}

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
                <div className="w-full  mt-10 max-w-[350px]  border rounded-2xl h-full p-4 overflow-y-auto">
                  <span className="text-gray-700 text-[14px] font-semibold ">
                    Funding Recodes
                  </span>
                  {loading ? (
                    <div className="flex justify-center items-center h-40">
                      <p className="text-gray-500">Loading payments...</p>
                    </div>
                  ) : payments.length === 0 ? (
                    <div className="text-center text-gray-500">
                      <p>No payments found.</p>
                    </div>
                  ) : (
                    <div className="mt-2">
                      {payments.map((payment) => (
                        <div
                          key={payment._id}
                          className=" px-2 py-3 bg-white border-t border-gray-100  transition-shadow duration-300"
                        >
                          {/* Body */}
                          <div className="flex flex-row text-[13px] justify-between items-center">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="font-medium text-gray-700">
                                  Transaction:
                                </span>
                                <span className=" text-gray-400">
                                  #{payment._id?.slice(-6) || "N/A"}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <span className="font-medium text-gray-700">
                                  Amount:
                                </span>
                                <span className=" text-gray-400">
                                  ${payment.amount.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <span className="font-medium text-gray-700">
                                  Date:
                                </span>
                                <span className=" text-gray-400">
                                  {new Date(
                                    payment.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            <div className="flex justify-between items-center mb-2">
                              <span
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                  payment.status === "Successful"
                                    ? "bg-green-100 text-green-600"
                                    : payment.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-600"
                                      : "bg-red-100 text-red-600"
                                }`}
                              >
                                {payment.status === "Successful" && (
                                  <BadgeCheck size={14} />
                                )}
                                {payment.status === "Pending" && (
                                  <Clock size={14} />
                                )}
                                {payment.status === "Failed" && (
                                  <XCircle size={14} />
                                )}
                                {payment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
