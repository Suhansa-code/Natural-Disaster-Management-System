import React, { useEffect, useState, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import uploadimg from "../assets/Icons/cloud-add.png";
import CheckoutForm from "../Components/Checkout";
import toast from "react-hot-toast";

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
  const [depositBranch, setDepositBranch] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).filter((file) =>
      [".png", ".pdf"].includes(file.name.slice(-4).toLowerCase())
    );
    setSelectedFiles(files);
  };

  const handleSubmit = async () => {
    if (
      !fullName ||
      !depositBranch ||
      !remark ||
      !amount ||
      selectedFiles.length === 0
    ) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("username", "65d123abc456def789ghi012"); // Replace with actual user ID
    formData.append("amount", amount);
    formData.append("currency", "USD");
    formData.append("slipImage", "testing");
    formData.append("email", "pasinduh@gmail.com");

    selectedFiles.forEach((file, index) => {
      formData.append(`file`, file);
    });

    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    console.log(formObject);

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
            email: "Paasinduh@inqube.com",
            amount: amount,
            branch: depositBranch,
            currency: "USD",
            slipImage: "Sample",
          }),
        }
      );

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessage("Payment submitted successfully!");
        setFullName("");
        setDepositBranch("");
        setRemark("");
        setAmount("");
        setSelectedFiles([]);
      } else {
        setMessage(result.error || "Something went wrong!");
      }
    } catch (error) {
      setLoading(false);
      setMessage("Error submitting payment.");
      toast.error("Error submitting payment.");
    }
  };

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <div className="w-auto bg-gray-50 shadow-md rounded-lg p-5 space-y-5">
        <h1 className="text-lg font-semibold text-gray-700">Funding Method</h1>

        <div className="flex flex-row">
          <div className="max-w-lg flex flex-col">
            {/* Bank Slip Upload */}
            <div className="space-y-3">
              <h2 className="text-md font-medium text-gray-600">
                Bank Slip Upload
              </h2>
              <form className="space-y-3">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <input
                  type="text"
                  value={depositBranch}
                  onChange={(e) => setDepositBranch(e.target.value)}
                  placeholder="Deposit Branch"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                />{" "}
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <textarea
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Funding remark"
                  className="w-full p-2 border border-gray-300 rounded-md min-h-[120px] focus:outline-none focus:ring-1 focus:ring-teal-500"
                ></textarea>
              </form>
            </div>

            {/* File Upload */}
            <div className="flex flex-col items-center space-y-3">
              {selectedFiles.length === 0 ? (
                <div className="border-2 border-dashed border-teal-400 p-4 rounded-md text-center w-full">
                  <img
                    src={uploadimg}
                    className="w-10 h-10 mx-auto"
                    alt="Upload"
                  />
                  <p className="text-gray-500 text-sm">
                    Choose a file or drag & drop here
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="mt-2 px-3 py-1 bg-teal-500 text-white rounded-md text-sm hover:bg-teal-600"
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
              ) : (
                <ul className="w-full space-y-2">
                  {selectedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-200 rounded-md text-sm"
                    >
                      <span className="text-gray-700">{file.name}</span>
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

            {/* Submit & Clear Buttons */}
            <div className="flex space-x-3 mt-5 justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-1 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-600"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFullName("");
                  setDepositBranch("");
                  setRemark("");
                  setSelectedFiles([]);
                  setMessage("");
                  setAmount("");
                }}
                className="px-4 py-1 border border-gray-400 text-sm rounded-md hover:bg-gray-200"
              >
                Clear
              </button>
            </div>

            {/* Message Display */}
            {message && (
              <p className="text-center text-red-500 mt-3">{message}</p>
            )}
          </div>

          <div className="max-w-md flex flex-row">
            {/* Divider */}
            <div className="flex flex-row">
              <div className="relative flex flex-col items-center">
                <div className="flex-grow border-l border-gray-300"></div>
                <span className="m-3 mx-5 text-gray-400 text-sm">or</span>
                <div className="flex-grow border-l border-gray-300"></div>
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
