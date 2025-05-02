import React, { useState, useEffect } from "react";
import Select from "react-select";
import bankData from "../../Dataset/banks.json";

const BankSelector = ({ bankName, setBankName }) => {
  const [bankOptions, setBankOptions] = useState([]);

  useEffect(() => {
    const banks = bankData.map((bank) => ({
      value: bank.name,
      label: bank.name,
    }));
    setBankOptions(banks);
  }, []);

  return (
    <Select
      value={bankOptions.find((option) => option.value === bankName) || null}
      onChange={(selectedOption) => {
        setBankName(selectedOption.label); // Update the bankName state
      }}
      options={bankOptions}
      placeholder="Select a Bank"
      isSearchable
      className="w-full rounded-[12px]   border-[1px] opacity-90 text-[14px] focus:ring-0 text-left focus:border-1 outline-none focus:border-primary-light text-text-primary dark:text-text-dark"
      styles={{
        control: (base, state) => ({
          ...base,
          padding: "2px",
          border: "none",
          outline: "none",
          color: "#1e293b",
          ring: "none",
          borderColor: state.isFocused ? "#1BB66E" : "#2d2d2d",
          boxShadow: state.isFocused ? "0 0 0px 1px #1BB66E" : "none",
          borderRadius: "12px",
          height: "36px",
          // Green when focused
        }),
        singleValue: (base) => ({
          ...base,
          color: "#1e293b", // Ensure selected text color
        }),
      }}
    />
  );
};

export default BankSelector;
