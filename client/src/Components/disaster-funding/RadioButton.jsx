import React, { useState } from "react";

const RectangleRadioButtons = () => {
  const [selectedOption, setSelectedOption] = useState("all");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex space-x-0 w-auto rounded-[5px] h-auto mt-3 ml-3  ">
      {/* All Button */}
      <label
        className={` self-center items-center  select-none w-[50px] h-[30px] py-1 text-[13px] rounded-tl-[5px] rounded-bl-[5px] font-normal text-gray-400 cursor-pointer ${
          selectedOption === "all"
            ? "bg-primary-light text-white"
            : "bg-gray-100 text-gray-700"
        } transition-colors duration-200 ease-in-out`}
      >
        <input
          type="radio"
          value="all"
          name="status"
          className="hidden"
          checked={selectedOption === "all"}
          onChange={handleChange}
        />
        All
      </label>

      {/* Completed Button */}
      <label
        className={`self-center items-center  select-none w-[80px] h-[30px] py-1 text-[13px] font-normal text-gray-400   cursor-pointer ${
          selectedOption === "completed"
            ? "bg-primary-light text-white"
            : "bg-gray-100 text-gray-700"
        } transition-colors duration-200 ease-in-out`}
      >
        <input
          type="radio"
          value="completed"
          name="status"
          className="hidden"
          checked={selectedOption === "completed"}
          onChange={handleChange}
        />
        Completed
      </label>

      {/* Rejected Button */}
      <label
        className={`self-center items-center select-none w-[80px] h-[30px] py-1 text-[13px] rounded-tr-[5px] rounded-br-[5px] font-normal text-gray-400  cursor-pointer ${
          selectedOption === "rejected"
            ? "bg-primary-light text-white"
            : "bg-gray-100 text-gray-700"
        } transition-colors duration-200 ease-in-out`}
      >
        <input
          type="radio"
          value="rejected"
          name="status"
          className="hidden"
          checked={selectedOption === "rejected"}
          onChange={handleChange}
        />
        Rejected
      </label>
    </div>
  );
};

export default RectangleRadioButtons;
