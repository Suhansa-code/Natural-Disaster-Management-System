import { useEffect, useState } from "react";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { CiExport } from "react-icons/ci";
import { MdOutlineFilterList } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import Payment_Grid from "../Components/Payment_Grid.jsx";

const Admin_Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [sortOrder, setSortOrder] = useState("date-desc");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/payment/");
      const data = await response.json(); // Convert response to JSON
      setPayments(data); // Set the data to state
      console.log(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    {
      name: "Pending",
      value: payments.filter((p) => p.status === "pending").length,
    },
    {
      name: "Approved",
      value: payments.filter((p) => p.status === "approved").length,
    },
  ];

  const COLORS = ["#ff9800", "#4caf50"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-row justify-between gap-4 ">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-row justify-between w-full bg-white  rounded-[5px] p-5">
            <div className="flex flex-col items-start">
              <h2 className="text-text-primary text-[15px] font-semibold">
                Donation Income
              </h2>
              <p className="text-text-secondary text-[12px] opacity-70  font-normal">
                Listed below are all conclusion from donation income
              </p>
            </div>
            <button
              type="button"
              className="mt-2 px-3 py-1 bg-white border border-border-default h-[30px]   text-gray-400 font-normal rounded-md text-[13px] hover:bg-gray-50"
            >
              <div className="flex flex-row items-center gap-2">
                <CiExport className="text-gray-400 w-4 h-4" />
                <p>Export Invoice</p>
              </div>
            </button>
          </div>

          <div className="flex flex-col w-full bg-white  rounded-[5px] p-5 gap-10">
            <div className="flex flex-row justify-between ">
              <div className="flex flex-col items-start">
                <h2 className="text-text-primary text-[15px] font-semibold">
                  Billing & Donations
                </h2>
                <p className="text-text-secondary text-[12px] opacity-70  font-normal">
                  Listed below are all are your donations and bills
                </p>
              </div>
              <div className="flex flex-row gap-3">
                {/* Filter & Sort Controls */}
                <div className="flex justify-between items-center mb-4 gap-x-2 mt-2">
                  {/* Search Filter */}
                  <input
                    type="text"
                    placeholder="Search Transactions..."
                    className="border px-3 py-1 text-text-secondary rounded-[4px] text-[13px] outline-none w-[240px] border-gray-300"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />

                  {/* Sorting Dropdown */}
                  <select
                    className="border px-3 py-1 w-[160px] rounded-[4px] text-text-secondary outline-none text-[13px] border-gray-300"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="date-desc">Date (Newest First)</option>
                    <option value="date-asc">Date (Oldest First)</option>
                    <option value="amount-desc">Amount (High to Low)</option>
                    <option value="amount-asc">Amount (Low to High)</option>
                  </select>
                </div>
                <button
                  type="button"
                  className=" hidden mt-2 px-3 py-1 bg-white border border-border-default h-[30px]   text-gray-400 font-normal rounded-md text-[13px] hover:bg-gray-50"
                >
                  <div className="flex flex-row items-center gap-2 ">
                    <SlCalender className="text-gray-400 w-4 h-4" />
                    <p>Select Date</p>
                  </div>
                </button>
                <button
                  type="button"
                  className="hidden mt-2 px-3 py-1 bg-white border border-border-default h-[30px]   text-gray-400 font-normal rounded-md text-[13px] hover:bg-gray-50"
                >
                  <div className="flex flex-row items-center gap-2">
                    <MdOutlineFilterList className="text-gray-400 w-4 h-4" />
                    <p>Apply Filter</p>
                  </div>
                </button>
              </div>
            </div>
            <Payment_Grid
              payments={payments}
              loading={loading}
              filterText_pros={filterText}
              sortOrder__pros={sortOrder}
              fetchPayments={fetchPayments}
            />
          </div>
        </div>

        <div className="flex flex-col max-w-screen-lg  bg-white shadow-sm rounded-[5px] p-5 min-w-[400px]">
          {/* invoice Header */}
          <div className="flex flex-row">
            <div className="flex flex-row">
              <img src="" alt="" />
              <div className="flex flex-col">
                <h3>Invoice</h3>
                <p>#1234566</p>
              </div>
            </div>
            <div className="flex flex-col">
              <p>Start Date : 12/04/2024</p>
              <p>end Date : 12/24/2025</p>
            </div>
          </div>

          <div className="flex flex-col">
            <h2>Startling value</h2>
            <p>4517 Washington , new york , Kentarkey 39495</p>
          </div>

          <h2>items details</h2>
        </div>
      </div>
    </div>
  );
};

export default Admin_Payment;
