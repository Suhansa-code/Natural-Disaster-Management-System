import { useEffect, useState } from "react";
import React from "react";
import Icon1 from "../assets/Icons/Icon1.png";
import Icon2 from "../assets/Icons/Icon2.png";
import Icon3 from "../assets/Icons/Icon3.png";
import Profile_pic from "../assets/Profile_Pic.jpg";
import Verticle_Barchart from "../Components/disaster-funding/Verticle_BarChart.jsx";
import PieChart from "../Components/disaster-funding/Pie-Chart.jsx";
import DisasterLineChart from "../Components/admin-dashboard/DisasterLineChart.jsx";
import Dashboard_grid from "../Components/admin-dashboard/Dashboard-Datagrid.jsx";
import toast from "react-hot-toast";

const Dataset = {
  Donations: "$350.00",
  savings: "$250.00",
  Distribution: "$250.00",
  BalanceAmount: "$320.45",
  usertraffic: 4500,
  disasters: [
    { type: "Earthquake", count: 40 },
    { type: "Flood", count: 25 },
    { type: "Hurricane", count: 15 },
    { type: "Tornado", count: 10 },
    { type: "Wildfire", count: 5 },
    { type: "Others", count: 5 },
  ],
  disasterLineChartData: [
    { date: "Feb 26", count: 20 },
    { date: "March 01", count: 15 },
    { date: "March 10", count: 30 },
    { date: "March 12", count: 10 },
    { date: "March 16", count: 25 },
    { date: "March 20", count: 35 },
  ],

  users: [
    {
      name: "Damsara Dinindu",
      email: "Adela.P.@pro.com",
      profilePic: "https://placehold.co/40x40",
    },
    {
      name: "Pasindu Hansana",
      email: "Christian142@yahoo.com",
      profilePic: "https://placehold.co/40x40",
    },
    {
      name: "Kusal Mendis",
      email: "JsenSaththam@inqe.com",
      profilePic: "https://placehold.co/40x40",
    },
    {
      name: "Pathum Nissanka",
      email: "lara.croft@tombraider.com",
      profilePic: "https://placehold.co/40x40",
    },
    {
      name: "Kumar Sangakkara",
      email: "john.doe@example.com",
      profilePic: "https://placehold.co/40x40",
    },

    {
      name: "Sanath Jayasuriya",
      email: "mark.spade@spades.com",
      profilePic: "https://placehold.co/40x40",
    },
  ],
  disastersinfo: [
    {
      type: "Earthquake",
      frequency: "40 Occurrences",
      dateRange: "Jan 2023 - Feb 2023",
      detailsUrl: "/earthquake-details",
    },
    {
      type: "Flood",
      frequency: "25 Occurrences",
      dateRange: "March 2023",
      detailsUrl: "/flood-details",
    },
    {
      type: "Hurricane",
      frequency: "15 Occurrences",
      dateRange: "August 2023",
      detailsUrl: "/hurricane-details",
    },
  ],
  recodes: [
    {
      Id: "rec001",
      date: "2025-03-21T12:34:56Z",
      remark: "Payment processing for order #001",
      status: "Pending",
    },
    {
      Id: "rec002",
      date: "2025-03-22T08:21:47Z",
      remark: "Approval requested for order #002",
      status: "Approved",
    },
    {
      Id: "rec003",
      date: "2025-03-23T14:45:19Z",
      remark: "Rejection due to insufficient funds",
      status: "Rejected",
    },
    {
      Id: "rec004",
      date: "2025-03-24T10:30:01Z",
      remark: "Payment completed for order #004",
      status: "Completed",
    },
    {
      Id: "rec005",
      date: "2025-03-25T16:20:43Z",
      remark: "Pending approval for order #005",
      status: "Pending",
    },
  ],
};

const Dashboard = () => {
  const [payment_data, setPayment_data] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRecode, setNewRecode] = useState({});
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("");
  const [Datarecode, setDataset] = useState([]);

  useEffect(() => {
    console.log(remark);
    const mergedData = { ...Datarecode, remark, status };
    fetchDataset();
    fetchPayments();
    setNewRecode(mergedData);
  }, []);

  useEffect(() => {
    setNewRecode((prev) => ({ ...prev, remark, status }));
  }, [remark, status]);

  const [isFormVisible, setIsFormVisible] = useState(false);

  // Handle form submission to add a new recode
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(newRecode);
    try {
      const response = await fetch("http://localhost:5000/api/dashboard/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecode),
      });

      if (!response.ok) {
        throw new Error(`Failed to add record: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      setNewRecode({ date: "", remark: "", status: "" }); // Reset form fields
      setIsFormVisible(false); // Close form
      fetchDataset();

      toast.success("Recode added successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to add recode." + error.message);
    }
  };

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
  const data = getChartData(payment_data);

  const fetchDataset = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dashboard/");
      const data = await response.json(); // Convert response to JSON
      setDataset(data); // Set the data to state
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/payment/");
      const data = await response.json(); // Convert response to JSON
      setPayment_data(data); // Set the data to state
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div class="bg-gray-100 text-gray-800">
        <div class="flex">
          <div class="flex-1 p-6">
            <div class="flex justify-between items-center mb-6">
              <div className="text-left">
                <h1 class="text-[22px] font-semibold">
                  Guardian Earth - Dashboard
                </h1>
                <p class="text-gray-500 text-[14px] ">
                  Dashboard monitors, alerts, and tracks resources for effective
                  response.
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <div class="relative">
                  <input
                    class="bg-gray-200 rounded-full py-2 px-4 w-[300px] outline-none text-[14px]"
                    placeholder="Search"
                    type="text"
                  />
                  <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
                <i class="fas fa-bell text-gray-500"></i>
                <img
                  alt="User profile picture"
                  class="rounded-full w-[40px] h-[40px] object-cover "
                  src={Profile_pic}
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
              <div className="flex flex-row h-[90px] items-center w-full bg-white p-4 rounded-lg shadow gap-4">
                <img src={Icon1} alt="icon1" className="w-16 h-16" />
                <div class=" text-left w-full ">
                  <p class="text-gray-400 text-[15px]">Donations</p>

                  <p class="text-[24px] font-semibold">{Dataset.Donations}</p>
                </div>
              </div>
              <div className="flex flex-row w-full  h-[90px] items-center bg-white p-4 rounded-lg shadow gap-4">
                <img src={Icon2} alt="icon2" className="w-16 h-16" />
                <div class=" text-left w-full ">
                  <p class="text-gray-400 text-[15px]">Savings</p>
                  <p class="text-[24px] font-semibold">{Dataset.savings}</p>
                </div>
              </div>

              <div className="flex flex-row w-full  h-[90px] items-center bg-white p-4 rounded-lg shadow gap-4">
                <img
                  src={Icon3}
                  alt="icon3"
                  className="w-16 h-16 opacity-50 rounded-3xl"
                />
                <div class=" text-left w-full ">
                  <p class="text-gray-400 text-[15px]">Distribution</p>
                  <p class="text-[24px] font-semibold">
                    {Dataset.Distribution}
                  </p>
                  <p class="text-gray-400 text-[12px]">
                    <span className="text-green-400  font-semibold">+24% </span>
                    since last month
                  </p>
                </div>
              </div>

              <div className="flex flex-row w-full  h-[90px] items-center bg-white p-4 rounded-lg shadow gap-4">
                <img
                  src={Icon2}
                  alt="icon3"
                  className="w-16 h-16 opacity-50 rounded-3xl"
                />
                <div class=" text-left w-full ">
                  <p class="text-gray-400 text-[15px]">Balance Amount</p>
                  <p class="text-[24px] font-semibold">
                    {Dataset.BalanceAmount}
                  </p>
                  <p class="text-gray-400 text-[12px]">
                    <span className="text-green-400  font-semibold">+24% </span>
                    since last month
                  </p>
                </div>
              </div>

              <div className="flex flex-row w-full  h-[90px] items-center bg-white p-4 rounded-lg shadow gap-4">
                <img
                  src={Icon3}
                  alt="icon3"
                  className="w-16 h-16 opacity-50 rounded-3xl"
                />
                <div class=" text-left w-full ">
                  <p class="text-gray-400 text-[15px]">User Traffic</p>
                  <p class="text-[24px] font-semibold">{Dataset.usertraffic}</p>
                  <p class="text-gray-400 text-[12px]">
                    <span className="text-green-400  font-semibold">+450 </span>
                    since last week
                  </p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div class="bg-white p-4 rounded-lg shadow col-span-2">
                <div class="flex justify-between items-center mb-4">
                  <div className="flex flex-col text-left">
                    <p class="text-lg font-bold">This Month Donation</p>
                    <p class="text-[13px] font-normal text-gray-400">
                      Analysis of Donations for the Current Month
                    </p>
                  </div>
                  <div className="flex flex-row-reverse gap-3 mt-2 items-center justify-center">
                    <select className="border px-3 py-1 w-[120px] h-[30px] rounded-[4px] text-text-secondary outline-none text-[13px] border-gray-300 mr-3 ">
                      <option value="Daily">Daily (Daily)</option>
                      <option value="Weekly">Weekly (Weekly)</option>
                      <option value="Monthly">Monthly (Monthly)</option>
                      <option value="Yearly">Yearly (Yearly)</option>
                    </select>
                    <div className="flex items-center h-[25px] justify-center bg-green-200 rounded-[20px]">
                      <p class="text-green-600 px-4 font-medium py-[1.5px] text-[13px]">
                        On track
                      </p>
                    </div>
                  </div>
                </div>
                <Verticle_Barchart data={data} height={"24rem"} />
              </div>
              <div class="bg-white p-4 rounded-lg shadow">
                <div className="flex flex-col text-left">
                  <p class="text-lg font-bold">Disaster Types</p>
                  <p class="text-[13px] font-normal text-gray-400">
                    Analysis based on the disaster types
                  </p>
                  <PieChart data={Dataset.disasters} />
                </div>
              </div>
            </div>

            {/* Second Row Grid 1st Card*/}
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_200px_1fr]  gap-4 mb-4">
              <div class="bg-white p-4 rounded-lg shadow ">
                <div className="flex flex-col text-left ">
                  <p class="text-lg font-bold">Disaster Frequency</p>
                  <p class="text-[13px] font-normal text-gray-400">
                    Analysis based on the disaster Frequency
                  </p>
                  <DisasterLineChart data={Dataset.disasterLineChartData} />
                </div>
              </div>

              {/* Second Row Grid 2nd Card*/}
              <div className="flex flex-col gap-4">
                {Dataset &&
                  Dataset.disastersinfo &&
                  Dataset.disastersinfo.length > 0 &&
                  Dataset.disastersinfo.map((disaster, index) => (
                    <div className="bg-white p-4 h-full rounded-lg shadow flex flex-col justify-center items-center">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <p className="text-lg font-semibold ">
                            {disaster.type}
                          </p>
                          <p className="text-gray-500 text-sm mb-1">
                            {disaster.frequency}
                          </p>
                          <p className="text-sm text-gray-400">
                            Date: {disaster.dateRange}
                          </p>
                        </div>
                      </div>
                      <button className="bg-green-500 h-[30px] w-[120px] items-center flex text-center  text-white px-4 py-2 rounded-md hover:bg-green-600 mt-4">
                        View Details
                      </button>
                    </div>
                  ))}
              </div>

              <div class="bg-white p-4 rounded-lg shadow w-full">
                <div className="flex flex-col text-left w-full">
                  <p class="text-lg font-bold">Register users</p>
                  <p class="text-[13px] font-normal text-gray-400 w-full">
                    List of Registered users for Guardian Earth
                  </p>
                </div>

                <ul>
                  {Dataset &&
                    Dataset.users &&
                    Dataset.users.length > 0 &&
                    Dataset.users.map((user, index) => (
                      <li class="flex items-center my-2 hover:bg-green-100 px-2 py-2 w-full rounded-sm">
                        <img
                          alt="Team member profile picture"
                          class="rounded-full mr-4"
                          src="https://placehold.co/40x40"
                        />
                        <div className="text-left">
                          <p class="font-semibold text-[15px]">{user.name}</p>
                          <p class="text-sm text-gray-500 text-[13px]">
                            {user.email}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div class="bg-white p-4 rounded-lg shadow">
              <Dashboard_grid recodes={Datarecode} fetchdata={fetchDataset} />
            </div>

            <div class="bg-white p-4 rounded-lg shadow flex flex-col justify-center items-center">
              {/* Button to toggle form visibility */}
              <button
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="px-4 py-2 w-[200px] bg-green-500 text-white rounded-lg mb-4 h-[35px] flex items-center justify-center"
              >
                {isFormVisible ? "Close Form" : "Add New Recode"}
              </button>

              {/* Form for adding a new recode */}
              {isFormVisible && (
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-white p-4 rounded-lg shadow-lg mb-4"
                >
                  <div className="flex flex-col gap-6 p-6 bg-white rounded-lg  max-w-md mx-auto">
                    {/* Recode ID */}
                    <div>
                      <label className="text-sm font-semibold text-gray-800">
                        Recode ID
                      </label>
                      <input
                        type="text"
                        name="id"
                        value={newRecode.id}
                        className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-500 transition duration-300"
                        required
                      />
                    </div>

                    {/* Recode Date */}
                    {/* <div>
                      <label className="text-sm font-semibold text-gray-800">
                        Recode Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={recodeDate}
                        onChange={(e) => setDate(e.target.value)}
                        className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-500 transition duration-300"
                        required
                      />
                    </div> */}

                    {/* Recode Remark */}
                    <div>
                      <label className="text-sm font-semibold text-gray-800">
                        Recode Remark
                      </label>
                      <textarea
                        name="remark"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="border border-gray-300 p-3 rounded-md w-full h-24 focus:outline-none focus:ring-1 focus:ring-green-500 transition duration-300"
                        required
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className="text-sm font-semibold text-gray-800">
                        Status
                      </label>
                      <select
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-500 transition duration-300"
                        required
                      >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-6 py-3 rounded-lg mt-6 w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                    >
                      Add Recode
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
