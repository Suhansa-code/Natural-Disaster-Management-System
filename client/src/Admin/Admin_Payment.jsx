import { useEffect, useState } from "react";
import RadioButton from "../Components/RadioButton.jsx";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { CiExport } from "react-icons/ci";
import { MdOutlineFilterList } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import Payment_Grid from "../Components/Payment_Grid.jsx";
import ProgressLinearChart from "../Components/LinearChart.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiProgress2Line } from "react-icons/ri";
import VerticalBarChart from "../Components/Verticle_BarChart.jsx";
import invoice_jpg from "../assets/Icons/invoice.png";
import { FaFilePdf } from "react-icons/fa6";

const Admin_Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [sortOrder, setSortOrder] = useState("date-desc");
  const [progress, setProgress] = useState(40); // Change this value dynamically
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");

  const segments = [
    { value: 20 },
    { value: 40 },
    { value: 60 },
    { value: 80 },
    { value: 100 },
  ];

  const getChartData = (payments) => {
    const monthMap = {};

    // Iterate over each payment and accumulate values by month
    payments.forEach((payment) => {
      const date = new Date(payment.createdAt);
      const month = date.toLocaleString("default", { month: "short" }); // Get the abbreviated month name
      const year = date.getFullYear(); // Get the year
      const monthYear = `${month}-${year}`; // Format it as "Mar-2025"

      // Accumulate the amount for each month-year combination
      if (!monthMap[monthYear]) {
        monthMap[monthYear] = 0;
      }
      monthMap[monthYear] += payment.amount;
    });

    // Format the data into the required structure for the chart
    const chartData = Object.keys(monthMap).map((monthYear) => {
      return { label: monthYear, value: monthMap[monthYear] };
    });

    return chartData;
  };
  const data = getChartData(payments);

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
          <div className="flex flex-col bg-white p-5 w-full gap-2 rounded-[5px]">
            <div className="flex flex-row justify-between w-full ">
              <div className="flex flex-col items-start">
                <h2 className="text-text-primary text-[15px] font-semibold">
                  Donation Income
                </h2>
                <p className="text-text-secondary text-[13px] opacity-70  font-normal">
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

            <div className="flex flex-row gap-3 mt-2">
              <div className="flex flex-col border-[1px] h-[250px] w-[65%] rounded-[5px]">
                <div className="flex flex-row justify-between">
                  <RadioButton />
                  {/* Sorting Dropdown */}
                  <select className="border px-3 py-1 w-[120px] h-[30px] rounded-[4px] text-text-secondary outline-none text-[13px] border-gray-300 mt-3 mr-3 ">
                    <option value="Daily">Daily (Daily)</option>
                    <option value="Weekly">Weekly (Weekly)</option>
                    <option value="Monthly">Monthly (Monthly)</option>
                    <option value="Yearly">Yearly (Yearly)</option>
                  </select>
                </div>
                <VerticalBarChart data={data} />
              </div>

              <div className="border-[1px] h-[250px] w-[35%] rounded-[5px] p-3">
                <div className="flex flex-col">
                  <p className="text-[18px] -mt-1 mb-1  flex flex-row justify-between items-center text-left font-semibold text-text-primary ">
                    Overview
                    <RiProgress2Line className="text-gray-400 w-4 h-5" />
                  </p>
                  <div className="w-full  h-[0.5px] opacity-25 bg-border-default mb-3 " />

                  <div className="flex flex-row justify-between">
                    <span className="text-[13px] text-left font-semibold text-gray-400">
                      Total Paid
                    </span>
                    <span className="text-[13px] text-left font-medium text-text-secondary">
                      152
                    </span>
                  </div>
                  <div className="flex flex-row justify-between my-2">
                    <span className="text-[13px] text-left font-semibold text-gray-400">
                      Total Issued
                    </span>
                    <span className="text-[13px] text-left font-medium text-text-secondary ">
                      32
                    </span>
                  </div>
                  <ProgressLinearChart
                    segments={segments}
                    completed={progress}
                  />

                  <div className="flex flex-row justify-around">
                    <div className="flex flex-col justify-center items-center">
                      <div className="w-[1px] h-4 bg-border-default" />
                      <span className="text-[12px] text-left font-normal text-gray-400">
                        Payment Completed
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <div className="w-[1px] h-4 bg-border-default" />
                      <span className="text-[12px] text-left font-normal text-gray-400">
                        Payment pending
                      </span>
                    </div>
                  </div>
                  <a
                    className="text-[13px] flex flex-row items-center text-left font-semibold text-primary-light ml-1 my-4 mt-5"
                    href=""
                  >
                    View details
                    <FaArrowRightLong className="text-primary-light w-4 h-3 mt-[1px]  mx-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full bg-white  rounded-[5px] p-5 gap-5">
            <div className="flex flex-row justify-between ">
              <div className="flex flex-col items-start">
                <h2 className="text-text-primary text-[15px] font-semibold">
                  Billing & Donations
                </h2>
                <p className="text-text-secondary text-[13px] opacity-70  font-normal">
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

        <div className="flex flex-col max-w-screen-lg  bg-white shadow-sm rounded-[5px] p-5 min-w-[300px]">
          {/* invoice Header */}
          <div className="flex flex-row">
            <div className="flex flex-row justify-between">
              <img
                src={invoice_jpg}
                alt="Invoice Image"
                className="flex w-10 h-10 -ml-2 mr-2"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-[14px] font-medium  w-auto text-right  text-gray-900 ">
                  Invoice
                </h3>
                <p className="text-[12px] font-normal  w-auto text-right  text-gray-500 opacity-70">
                  1234566
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full gap-1 mt-[1px]">
              <p className="text-[12px] font-normal w-auto text-right  text-gray-500 opacity-70">
                Start Date : 12/04/2024
              </p>
              <p className="text-[12px] font-normal w-auto text-right  text-gray-500 opacity-70">
                end Date : 12/24/2025
              </p>
            </div>
          </div>
          {/* Seperator */}
          <div className="h-[0.5px] bg-border-default w-full opacity-30 my-2" />
          <div className="flex flex-col my-2">
            <h2 className="text-[14px] font-medium  w-auto text-left  text-gray-900 ">
              Startling value
            </h2>
            <p className="text-[12px] font-normal w-auto text-left mt-2  text-gray-500 opacity-70">
              4517 Washington , new york , Kentarkey 39495
            </p>
          </div>

          {/* Seperator */}
          <div className="h-[0.5px] bg-border-default w-full opacity-30 my-2" />

          <h2 className="text-[14px] font-medium  w-auto text-left  text-gray-900 ">
            Payment details
          </h2>
          <div className="grid grid-rows-3 gap-y-4 mt-4 mx-2 rounded-[4px] border-[1px] border-gray-200 ">
            <div className="flex flex-col justify-start border-b-[1px] border-gray-200 px-2 h-[60px]">
              <p className="text-[13px] font-normal w-auto text-left mt-1 text-gray-500 opacity-70 ">
                Bill Name
              </p>
              <p className="text-[13px] font-medium w-auto text-left text-gray-900">
                payments.user
              </p>
            </div>
            <div className="flex flex-col justify-start border-b-[1px] border-gray-200  px-2  h-[60px]">
              <p className="text-[13px] font-normal w-auto text-left mt-1  text-gray-500 opacity-70">
                Type
              </p>
              <p className="text-[13px] font-medium w-auto text-left text-gray-900">
                payments.paymentMethod
              </p>
            </div>
            <div className="flex flex-col justify-start pb-2 px-2  h-[60px] ">
              <p className="text-[13px] font-normal w-auto text-left mt-1 text-gray-500 opacity-70">
                Amount
              </p>
              <p className="text-[13px] font-medium w-auto text-left text-gray-900">
                payments.Amount
              </p>
            </div>
          </div>

          <h2 className="text-[14px] font-medium  w-auto text-left  text-gray-900 mt-6 mb-2">
            Note
          </h2>
          <p className="text-[13px] font-normal w-auto text-left  text-gray-500 opacity-70">
            Your generous contribution helps us continue our mission of making a
            meaningful impact. Every donation, no matter the size, plays a vital
            role in supporting our cause. Thank you for your commitment to
            bringing about positive change. Together, we can make a lasting
            difference in the lives of those who need it most.
          </p>

          <h2 className="text-[14px] font-medium  w-auto text-left  text-gray-900 mt-6 mb-2">
            Files
          </h2>
          <button
            onClick={() => approvePayment(payment._id, "Successful")}
            className="flex flex-row items-center justify-around px-2 py-0 text-white font-medium  h-[30px] w-[140px] bg-primary-light hover:bg-hover-light transition-all duration-200 my-2 rounded-[4px] text-[13px]"
          >
            <CiExport className="text-white w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin_Payment;
