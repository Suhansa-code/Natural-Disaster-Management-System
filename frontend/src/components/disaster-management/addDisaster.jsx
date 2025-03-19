import React, { useState, useEffect } from "react";

const AddDisaster = () => {
  const [disaster, setDisaster] = useState({
    name: "",
    description: "",
    location: "",
    severity: "",
    date: "",
  });

  const [text, setText] = useState("");
  const quotes = [
    "STAY CALM, DON'T BE PANIC",
    "HELP OTHERS IN NEED",
    "PREPARE BEFORE DISASTER STRIKES",
    "SAFETY FIRST, ALWAYS",
  ];
  
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true); // Tracks whether we are typing or deleting
  const [charIndex, setCharIndex] = useState(0); // Tracks the current character index for typing and deleting

  useEffect(() => {
    const currentQuote = quotes[quoteIndex];
    
    const interval = setInterval(() => {
      if (isTyping) {
        // Typing Mode
        if (charIndex < currentQuote.length) {
          setText((prev) => prev + currentQuote[charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setIsTyping(false); // Start deleting once typing is done
        }
      } else {
        // Deleting Mode
        if (charIndex > 0) {
          setText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          // Once deleting is done, switch to the next quote
          setIsTyping(true);
          setQuoteIndex((prev) => (prev + 1) % quotes.length); // Loop through the quotes
        }
      }
    }, 120); // Adjust typing/deleting speed here

    return () => clearInterval(interval);
  }, [charIndex, isTyping, quoteIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisaster({ ...disaster, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Disaster Details:", disaster);
  };

  return (
    <div className="flex h-screen ">
    
      {/* Left Side - Form */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-gray-100 rounded-tl-lg rounded-bl-lg">
        <div className="max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-10">Enter Here </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-large text-gray-700 ">Disaster Type</label>
              <input type="text" name="name" value={disaster.name} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={disaster.description} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" name="location" value={disaster.location} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Severity</label>
              <select name="severity" value={disaster.severity} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded">
                <option value="">Select Severity</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" name="date" value={disaster.date} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded" />
            </div>

            <button type="submit" className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-yellow-500 w-full">SUBMIT</button>
          </form>
        </div>
      </div>

      {/* Right Side - Auto Typing and Deleting Quotes */}
      <div className="w-1/2 flex items-center justify-center bg-green-600 text-white text-6xl font-bold text-center px-5 rounded-tr-lg rounded-br-lg">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default AddDisaster;
