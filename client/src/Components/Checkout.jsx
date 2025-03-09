import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Stripe_img from "../assets/Icons/Stripe.png";
import Amex_img from "../assets/Icons/American Express.png";
import toast from "react-hot-toast";
import jsPDF from "jspdf";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [cardType, setCardType] = useState("visa");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) return;
    if (!name || !email) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/payment/stripe-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name,
        email: email,
        currency: "USD",
        amount: amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error("Error:", err));

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: { name, email },
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Payment Method Created:", paymentMethod);
      toast.success("Payment Successful!");

      // Generate PDF
      const doc = new jsPDF();
      doc.text(`Payment Receipt`, 20, 20);
      doc.text(`Name: ${name}`, 20, 40);
      doc.text(`Email: ${email}`, 20, 50);
      doc.text(`Transaction ID: ${paymentMethod.id}`, 20, 60);
      doc.save("Payment_Receipt.pdf");

      // Send Email
      //sendEmail(name, email);
    }

    setLoading(false);
  };

  // // // Function to send an email with the PDF
  // // const sendEmail = async (name, email) => {
  // //   try {
  // //     const response = await fetch("http://localhost:5000/send-email", {
  // //       method: "POST",
  // //       headers: {
  // //         "Content-Type": "application/json",
  // //       },
  // //       body: JSON.stringify({ name, email }),
  // //     });

  // //     const data = await response.json();
  // //     if (data.success) {
  // //       toast.success("Email sent successfully!");
  // //     } else {
  // //       toast.error("Failed to send email.");
  // //     }
  // //   } catch (error) {
  // //     console.error("Email Error:", error);
  // //     toast.error("Error sending email.");
  // //   }
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto ml-2 p-6 rounded-xl shadow-lg bg-white dark:bg-slate-800 transition-all"
    >
      <h2 className="text-md font-medium text-text-primary mb-5">
        Online Payment
      </h2>

      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-text-primary dark:text-text-dark text-sm font-medium mb-1 text-left pl-3 ">
          Name
        </label>
        <input
          type="text"
          className="w-full p-3 h-10 rounded-[4px] text-[14px] border focus:ring-0 focus:border-1 outline-none border-border-border1  focus:border-primary-light bg-gray-0 dark:bg-gray-800 text-text-primary dark:text-text-dark"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-text-primary dark:text-text-dark text-sm font-medium mb-1 text-left pl-3 ">
          Email
        </label>
        <input
          type="email"
          className="w-full p-3 h-10 rounded-[4px] text-[14px] border focus:ring-0 focus:border-1 outline-none border-border-border1  focus:border-primary-light bg-gray-0 dark:bg-gray-800 text-text-primary dark:text-text-dark"
          placeholder="johndoe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="block text-text-primary dark:text-text-dark text-sm font-medium mb-1 text-left pl-3 ">
          Amount
        </label>
        <input
          type="Number"
          className="w-full p-3 h-10 rounded-[4px] text-[14px] border focus:ring-0 focus:border-1 outline-none border-border-border1  focus:border-primary-light bg-gray-0 dark:bg-gray-800 text-text-primary dark:text-text-dark"
          placeholder="$ 5000.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Card Selection */}
      <div className="mb-4">
        <label className="block text-text-primary dark:text-text-dark text-sm font-medium mb-2 text-left pl-3">
          Select Card
        </label>
        <div className="flex gap-4">
          {/* Visa */}
          <label
            className={`cursor-pointer transition-all border  hover:scale-115  duration-300 shadow-lg rounded-[4px] p-2 w-20 h-9 ${
              cardType === "visa"
                ? "border-primary-light shadow-xl border-[1.8px]"
                : "border-border-default border-[1px]"
            }`}
          >
            <input
              type="radio"
              name="cardType"
              className="hidden"
              value="visa"
              checked={cardType === "visa"}
              onChange={() => setCardType("visa")}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              className="h-full w-auto mx-auto object-fill"
            />
          </label>

          {/* MasterCard */}
          <label
            className={`cursor-pointer transition-all border  hover:scale-115  duration-300 shadow-lg rounded-[4px] p-2 w-20 h-9 ${
              cardType === "mastercard"
                ? "border-primary-light shadow-xl border-[1.8px]"
                : "border-border-default border-[1px]"
            }`}
          >
            <input
              type="radio"
              name="cardType"
              className="hidden"
              value="mastercard"
              checked={cardType === "mastercard"}
              onChange={() => setCardType("mastercard")}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="MasterCard"
              className="h-full w-auto mx-auto object-fill"
            />
          </label>

          {/* American Express */}
          <label
            className={`cursor-pointer transition-all border  hover:scale-115  duration-300 shadow-lg rounded-[4px] p-2 w-20 h-9 ${
              cardType === "amex"
                ? "border-primary-light shadow-xl border-[1.8px]"
                : "border-border-default border-[1px]"
            }`}
          >
            <input
              type="radio"
              name="cardType"
              className="hidden"
              value="amex"
              checked={cardType === "amex"}
              onChange={() => setCardType("amex")}
            />
            <img
              src={Amex_img}
              alt="American Express"
              className="h-full w-32 mx-auto object-cover"
            />
          </label>

          {/* Stripe */}
          <label
            className={`cursor-pointer transition-all border  hover:scale-115  duration-300 shadow-lg rounded-[4px] p-2 w-20 h-9 ${
              cardType === "Stripe"
                ? "border-primary-light shadow-xl border-[1.8px]"
                : "border-border-default border-[1px]"
            }`}
          >
            <input
              type="radio"
              name="cardType"
              className="hidden"
              value="Stripe"
              checked={cardType === "Stripe"}
              onChange={() => setCardType("Stripe")}
            />
            <img
              src={Stripe_img}
              alt="Paypal"
              className="h-full w-full mx-auto object-cover rounded-[40px]"
            />
          </label>
        </div>
      </div>

      {/* Card Number */}
      <div className="mb-4">
        <label className="block text-text-primary dark:text-text-dark text-sm font-medium text-left pl-3 mb-1">
          Card Number
        </label>
        <div className="p-3 border h-10 rounded-[4px] focus:ring-0 focus:border-1 outline-none border-border-border1  focus:border-primary-light  bg-gray-0 dark:bg-gray-800">
          <CardNumberElement
            options={{ style: { base: { fontSize: "13px", color: "#333" } } }}
          />
        </div>
      </div>

      {/* Expiry Date & CVC */}
      <div className="flex gap-4">
        {/* Expiration Date */}
        <div className="w-1/2">
          <label className="block text-text-primary dark:text-text-dark text-sm font-medium text-left pl-3 mb-1">
            Expiration Date
          </label>
          <div className="p-3 border border-x-border-border1  rounded-[4px] h-10 bg-[white] dark:bg-gray-800">
            <CardExpiryElement
              options={{ style: { base: { fontSize: "13px", color: "#333" } } }}
            />
          </div>
        </div>

        {/* CVC */}
        <div className="w-1/2">
          <label className="block text-text-secondary dark:text-text-dark text-sm font-medium text-left pl-3 mb-1">
            CVC
          </label>
          <div className="p-3 border border-border-border1  rounded-[4px] h-10 bg-[white] dark:bg-gray-800">
            <CardCvcElement
              options={{ style: { base: { fontSize: "13px", color: "#333" } } }}
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-2 text-left pl-3">{error}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full bg-primary-light h-10 text-white rounded-lg font-semibold mt-6 transition duration-300 ${
          loading
            ? "opacity-50"
            : "hover:bg-hover-light dark:hover:bg-hover-dark"
        }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default CheckoutForm;
