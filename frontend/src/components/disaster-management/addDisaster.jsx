import axios from "axios";
import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddDisaster() {
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    disasterType: "",
    severityLevel: "",
    description: "",
    numberOfPeopleAffected: "",
    images: "",
    date: "",
    Location: "",
    contact: "",
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

  const [errors, setErrors] = useState({
    disasterType: "",
    severityLevel: "",
    numberOfPeopleAffected: "",
    contact: "", // Error for phone number validation
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is "contact" (phone number), ensure it contains only digits
    if (name === "contact") {
      const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      setInputs((prevState) => ({
        ...prevState,
        [name]: numericValue,
      }));

      // Reset contact error message when the user starts typing
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact: "",
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if disasterType is selected
    if (inputs.disasterType === "") {
      setErrors((prevState) => ({
        ...prevState,
        disasterType: "Please select a disaster type.",
      }));
      return; // Prevent form submission if disaster type is not selected
    }

    if (inputs.severityLevel === "") {
      setErrors((prevState) => ({
        ...prevState,
        severityLevel: "Please select a severity level.",
      }));
      return;
    }

    // Check if number of people affected is negative
    if (inputs.numberOfPeopleAffected < 0) {
      setErrors((prevState) => ({
        ...prevState,
        numberOfPeopleAffected: "Number of people affected cannot be negative.",
      }));
      return; // Prevent form submission if the value is negative
    }

    // Validate the phone number length (should be exactly 10 digits)
    if (inputs.contact.length !== 10) {
      setErrors((prevState) => ({
        ...prevState,
        contact: "Phone number must be exactly 10 digits.",
      }));
      return; // Prevent form submission if the phone number is not 10 digits
    }

     // Date validation: Date should not be in the future and should not be older than 10 days
     const currentDate = new Date();
     const selectedDate = new Date(inputs.date);
     const tenDaysAgo = new Date();
     tenDaysAgo.setDate(currentDate.getDate() - 10);
 
     if (selectedDate > currentDate) {
       setErrors((prevState) => ({
         ...prevState,
         date: "Date cannot be in the future.",
       }));
       return;
     }
 
     if (selectedDate < tenDaysAgo) {
       setErrors((prevState) => ({
         ...prevState,
         date: "Date cannot be more than 10 days ago.",
       }));
       return;
     }



    try {
      await sendRequest();
      history("/DisasterDetails");
    } catch (err) {
      if (err.response && err.response.data) {
        // Handle backend error (if disasterType is required in backend)
        setErrors((prevState) => ({
          ...prevState,
          disasterType: err.response.data.message || "An error occurred.",
        }));
      }
    }
  };

  

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/disaster", {
      disasterType: inputs.disasterType,
      severityLevel: inputs.severityLevel,
      description: inputs.description,
      numberOfPeopleAffected: inputs.numberOfPeopleAffected,
      images: inputs.images,
      date: inputs.date,
      Location: inputs.Location,
      contact: inputs.contact,
    });
  };


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

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          try {
            // Fetch location details using OpenStreetMap (Nominatim)
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const address = data.display_name; // Get the formatted address
  
            setInputs((prevState) => ({
              ...prevState,
              Location: address,
            }));
          } catch (error) {
            console.error("Error fetching location:", error);
            alert("Unable to fetch location details. Try again.");
          }
        },
        (error) => {
          console.error("Geolocation Error:", error);
          alert("Location access denied. Enable GPS and try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden ">
    
      {/* Left Side - Form */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-gray-100 rounded-tl-lg rounded-bl-lg">
        <div className="max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-10"> Enter Here </h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 "> Disaster Type </label> 
              <select name="disasterType" value={inputs.disasterType} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded">

              <option value="">--Select Type--</option>
              <option value="Floods">Floods</option>
              <option value="Earthquakes">Earthquakes</option>
              <option value="Landslides">Landslides</option>
              <option value="Tornadoes">Tornadoes</option>
              <option value="Wildfires">Wildfires</option>
              <option value="Hurricanes">Hurricanes</option>
              <option value="Tsunamis">Tsunamis</option>
              </select>
               {/* Error Message for Disaster Type */}
               {errors.disasterType && <p className="text-red-500 text-xs italic">{errors.disasterType}</p>}
            </div>
           

            <div>
              <label className="block text-sm font-medium text-gray-700"> Severity Level</label>
              <select name="severityLevel" value={inputs.severityLevel} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded">
                
                <option value="">--Severity Level--</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
              {/* Error Message for Severity Level */}
              {errors.severityLevel && <p className="text-red-500 text-xs italic">{errors.severityLevel}</p>}


            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Description </label>
              <textarea name="description" value={inputs.description} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded"> </textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Location </label>
              <div className="flex space-x-2">
                <input type="text" name="Location"value={inputs.Location} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded"/>
               <button type="button" onClick={handleGetLocation} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"> Get Location</button>  

                </div>

            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700"> Number of People Affected </label>
              <input  type="number"name="numberOfPeopleAffected"value={inputs.numberOfPeopleAffected} onChange={handleChange} required className="mt-1 p-2 w-full border rounded"/>
              {errors.numberOfPeopleAffected && <p className="text-red-500 text-xs italic">{errors.numberOfPeopleAffected}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Date </label>
              <input type="date" name="date" value={inputs.date} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded"/>
              {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Phone Number</label>
              <input type="text" name="contact" value={inputs.contact} onChange={handleChange} placeholder="Enter phone" className="mt-1 p-2 w-full border border-gray-300 rounded"/>
              {errors.contact && <p className="text-red-500 text-xs italic">{errors.contact}</p>}
            </div>

            <button
              type="submit" className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-yellow-500 w-full" onClick={handleSubmit}>SUBMIT</button>
          </form>
        </div>
      </div>

      {/* Right Side - Auto Typing and Deleting Quotes */}
      <div className="relative w-1/2 flex items-center justify-center text-black text-6xl font-bold text-center px-5 rounded-tr-lg rounded-br-lg overflow-hidden">

      {/* Background Image with Reduced Opacity */}
      <div className="absolute inset-0 bg-[url('/src/assets/fire.png')] bg-cover bg-center opacity-20"></div>

        {/* Text on Top */}
        <span className="relative z-10">{text}</span>
      </div>
    </div>
  );
};

