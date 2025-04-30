import React, { useEffect, useState, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import uploadimg from "../assets/Icons/cloud-add.png";
import CheckoutForm from "../Components/disaster-funding/Checkout";
import toast from "react-hot-toast";
import earth_img from "../assets/Earth.webp";
import BankSelector from "../Components/disaster-funding/Bank-Selector";

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
    <div className="flex flex-col items-center  px-4">
      <div className="w-auto bg-gray-0  rounded-lg p-5 space-y-5">
        <div className="flex lg:flex-row flex-col">
          <div className="flex flex-col gap-4">
            <div className="flex w-full h-full rounded-xl border-2 shadow-lg bg-gradient-to-r from-green-500 bg-green-700 relative overflow-hidden">
              <img
                src={earth_img}
                alt="Modern Background"
                className="absolute right-0 top-2 w-32 h-32 object-cover opacity-100"
              />
              <div className="flex flex-col p-4 w-full gap-y-4  text-white">
                <div className="flex flex-row justify-between w-full pr-32 ">
                  <div className="flex flex-col text-left">
                    <span className="text-[12px] font-light opacity-80">
                      Disaster Type :
                    </span>
                    <span className="text-[18px] font-semibold">Hurricane</span>
                  </div>
                  <div className="flex flex-col text-left ">
                    <span className="text-[12px] font-normal opacity-80">
                      Date :
                    </span>
                    <span className="text-[14px] font-semibold w-[140px]">
                      August 23–31, 2005
                    </span>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-full pr-32 ">
                  <div className="flex flex-col text-left ">
                    <span className="text-[12px] font-normal opacity-80">
                      Impact :
                    </span>
                    <span className="text-[14px] font-semibold">
                      1,833 deaths, $125 billion in damages
                    </span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[12px] font-normal opacity-80">
                      Location :
                    </span>
                    <span className="text-[14px] font-semibold w-[140px] text-wrap">
                      USA (Louisiana, Mississippi, Florida)
                    </span>
                  </div>
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-[12px] font-medium mb-2 opacity-80">
                    Discription :
                  </span>
                  <span className="text-[14px] font-normal">
                    Hurricane Katrina was one of the deadliest and most costly
                    hurricanes in U.S. history. It made landfall on August 29,
                    2005, primarily affecting Louisiana, Mississippi, and
                    Florida. The storm reached Category 5 strength over the Gulf
                    of Mexico before weakening to a Category 3 at landfall.
                  </span>
                </div>
              </div>
            </div>
            <div className="mx-1 flex flex-col max-h-fit  p-6 rounded-xl items-center shadow-lg bg-white dark:bg-slate-800 transition-al">
              {/* Bank Slip Upload */}

              <div className="flex flex-row items-top w-full  justify-center gap-5">
                <div className="space-y-3 w-full">
                  <h2 className="text-md font-medium  text-gray-600">
                    Bank Slip Upload
                  </h2>
                  <form className="space-y-3">
                    <div className="mb-4 text-left">
                      <input
                        type="text"
                        value={fullName}
                        onChange={handleNameChange}
                        placeholder="Full Name"
                        className="w-full p-3 h-10 rounded-[4px] border text-[14px] focus:ring-0 focus:border-1 outline-none border-border-border1  focus:border-primary-light bg-gray-0 dark:bg-gray-800 text-text-primary dark:text-text-dark"
                      />
                      {/* Error Message */}
                      {nameError && (
                        <p className="text-red-500 text-[12px] mt-1 pl-3">
                          {nameError}
                        </p>
                      )}
                    </div>
                    <BankSelector
                      bankName={bankName}
                      setBankName={setBankName}
                    />
                    <div className="mb-4 text-left">
                      <input
                        type="text"
                        value={depositBranch}
                        onChange={handleBranchChange}
                        placeholder="Deposit Branch"
                        className="w-full p-3 h-10 rounded-[4px] border text-[14px] focus:ring-0 focus:border-1 outline-none border-border-border1  focus:border-primary-light bg-gray-0 dark:bg-gray-800 text-text-primary dark:text-text-dark"
                      />
                      {/* Error Message */}
                      {branchError && (
                        <p className="text-red-500 text-[12px] mt-1 pl-3">
                          {branchError}
                        </p>
                      )}
                    </div>
                    {/* Amount Input */}
                    <div className="mb-4 text-left">
                      <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Amount"
                        min="100"
                        step="1"
                        className="w-full p-3 h-10 rounded-[4px] border text-[14px] focus:ring-0 focus:border-1 outline-none border-border-border1  focus:border-primary-light bg-gray-0 dark:bg-gray-800 text-text-primary dark:text-text-dark"
                      />{" "}
                      {/* Error Message */}
                      {amount < 100 && amount && (
                        <p className="text-red-500 text-[12px] mt-1 pl-3">
                          {Amounterror}
                        </p>
                      )}
                    </div>
                    <textarea
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      placeholder="Funding remark"
                      className="w-full p-3 h-10 rounded-[4px] border text-[14px] focus:ring-0 focus:border-1 outline-none border-border-border1 min-h-[100px]  focus:border-primary-light bg-gray-0 dark:bg-gray-800 text-text-primary dark:text-text-dark"
                    ></textarea>
                  </form>
                </div>

                {/* File Upload */}
                <div className="flex flex-col w-full h-full items-center space-y-3 mt-2 py-3  ">
                  {selectedFiles.length === 0 ? (
                    <div className="border-2 border-dashed flex items-center h-full mt-4 justify-center  border-primary-light border-opacity-30 hover:border-opacity-70  p-4 rounded-md text-center w-full">
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={uploadimg}
                          className="w-10 h-10 mx-auto my-auto mt-2 items-center"
                          alt="Upload"
                        />
                        <p className="text-gray-500 text-sm">
                          Choose a file or drag & drop here
                        </p>

                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="mt-2 px-3 py-1 bg-primary-light text-white rounded-md text-sm hover:bg-hover-light"
                        >
                          Browse File
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept=".png, .pdf"
                          multiple
                          className="hidden"
                          onChange={handleFileChange}
                        />
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

                  {/* Submit & Clear Buttons */}
                  {/* Message Display */}
                  {message && (
                    <p className="text-right text-[12px]  w-full text-red-500  mt-3">
                      {message}
                    </p>
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
              </div>
            </div>
          </div>
          <div className="max-w-md flex flex-row mx-2">
            {/* Divider */}
            <div className="flex flex-row ">
              <div className="relative flex flex-col items-center">
                <div className="flex-grow border-l border-border-border1"></div>
                <span className="m-3 mx-5 text-gray-200 text-sm">or</span>
                <div className="flex-grow border-l border-border-border1"></div>
              </div>

              {/* Online Payment */}
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
