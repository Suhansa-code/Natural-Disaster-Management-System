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
import Modal from "../Components/main-components/Model";
import {
  Bell,
  PiggyBank,
  HandCoins,
  Users,
  BarChart3,
  FileDown,
} from "lucide-react";

const Dashboard = () => {
  const [payment_data, setPayment_data] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRecode, setNewRecode] = useState({});
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("");
  const [Datarecode, setDataset] = useState([]);
  const [users, setUsers] = useState([]);
  const [disasters, setDisasters] = useState([]);
  const [chartPeriod, setChartPeriod] = useState("Daily");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [datasetRecords, setDatasetRecords] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    Donations: "",
    savings: "",
    Distribution: "",
    BalanceAmount: "",
    usertraffic: 0,
    disastersinfo: [],
  });

  const fetchDatasetRecords = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dashboard/");
      const data = await response.json();
      // If your backend returns an array, use it directly
      setDatasetRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch dataset:", error);
      setDatasetRecords([]);
    }
  };

  const handleLoadDataset = (dataset) => {
    // Update all relevant states with the selected dataset

    setDashboardData({
      Donations: dataset.Donations ?? "",
      savings: dataset.savings ?? "",
      Distribution: dataset.Distribution ?? "",
      BalanceAmount: dataset.BalanceAmount ?? "",
      usertraffic: dataset.usertraffic ?? 0,
      disastersinfo: dataset.disastersinfo ?? [],
    });
    setUsers(dataset.users ?? []);
    setDisasters(dataset.disasters ?? []);
    // If you have other states to update, do so here
    // Optionally, store the loaded dataset id in localStorage for persistence
    localStorage.setItem("activeDatasetId", dataset._id);
  };

  const handleSyncRecode = async (recodeId) => {
    // Prepare the latest dashboard data for the recode
    const updatedRecode = {
      Donations: getTotalDonations().toFixed(2),
      savings: (getTotalDonations() - getTotalDonations() * 0.87).toFixed(2),
      Distribution: (
        users.filter((u) => u.status === "active").length / users.length || 0
      ).toFixed(2),
      BalanceAmount: (getTotalDonations() * 0.87).toFixed(2),
      usertraffic: getActiveUsersCount(),
      disasters: disasterTypeCounts.map((d) => ({
        type: d.type,
        count: d.count,
      })),
      disasterLineChartData,
      users,
      disastersinfo: latestDisasters,
      // Optionally, update recodes array or other fields as needed
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/dashboard/${recodeId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedRecode),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sync recode");
      }

      toast.success("Recode synced with latest dashboard data!");
      fetchDatasetRecords(); // Refresh datagrid
    } catch (error) {
      toast.error("Failed to sync recode: " + error.message);
    }
  };

  // Helper to group payments by period
  const getChartDataByPeriod = (payments, period) => {
    const groupMap = {};

    payments.forEach((payment) => {
      const date = new Date(payment.createdAt);
      let key = "";
      if (period === "Daily") {
        key = date.toLocaleDateString();
      } else if (period === "Weekly") {
        // Get ISO week number
        const tempDate = new Date(date.getTime());
        tempDate.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        tempDate.setDate(
          tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7)
        );
        const week1 = new Date(tempDate.getFullYear(), 0, 4);
        const weekNo =
          1 +
          Math.round(
            ((tempDate.getTime() - week1.getTime()) / 86400000 -
              3 +
              ((week1.getDay() + 6) % 7)) /
              7
          );
        key = `W${weekNo}-${tempDate.getFullYear()}`;
      } else if (period === "Monthly") {
        key = `${date.toLocaleString("default", { month: "short" })}-${date.getFullYear()}`;
      } else if (period === "Yearly") {
        key = `${date.getFullYear()}`;
      }
      if (!groupMap[key]) groupMap[key] = 0;
      groupMap[key] += payment.amount;
    });

    // Sort keys chronologically
    const sortedKeys = Object.keys(groupMap).sort((a, b) => {
      if (period === "Yearly") return a - b;
      if (period === "Monthly") {
        const [ma, ya] = a.split("-");
        const [mb, yb] = b.split("-");
        return new Date(`${ma} 1, ${ya}`) - new Date(`${mb} 1, ${yb}`);
      }
      if (period === "Weekly") {
        const [wa, ya] = a.replace("W", "").split("-");
        const [wb, yb] = b.replace("W", "").split("-");
        return ya !== yb ? ya - yb : wa - wb;
      }
      // Daily
      return new Date(a) - new Date(b);
    });

    return sortedKeys.map((label) => ({
      label,
      value: groupMap[label],
    }));
  };

  const chartData = getChartDataByPeriod(payment_data, chartPeriod);

  const latestDisasters = [...disasters]
    .sort(
      (a, b) =>
        new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
    )
    .slice(0, 3);

  // Export recodes as CSV
  const handleExportCSV = () => {
    if (!Datarecode || Datarecode.length === 0) {
      toast.error("No data to export.");
      return;
    }
    const headers = Object.keys(Datarecode[0]);
    const csvRows = [
      headers.join(","),
      ...Datarecode.map((row) =>
        headers
          .map(
            (field) => `"${(row[field] ?? "").toString().replace(/"/g, '""')}"`
          )
          .join(",")
      ),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "guardian_earth_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Report exported as CSV!");
  };
  // Fetch all disasters from backend
  const fetchDisasters = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/disaster");
      const data = await response.json();
      setDisasters(data.disasters || []);
    } catch (error) {
      toast.error("Failed to load disaster data");
      setDisasters([]);
    }
  };

  // Prepare disaster type data for PieChart
  const disasterTypeCounts = (() => {
    const typeMap = {};
    disasters.forEach((d) => {
      const type = d.disasterType || "Other";
      typeMap[type] = (typeMap[type] || 0) + 1;
    });
    return Object.entries(typeMap).map(([type, count]) => ({
      type,
      count,
    }));
  })();

  const getDisasterFrequencyByDate = (disasters, period = "Monthly") => {
    const groupMap = {};

    disasters.forEach((disaster) => {
      const date = new Date(disaster.date || disaster.createdAt);
      let key = "";
      if (period === "Daily") {
        key = date.toLocaleDateString();
      } else if (period === "Monthly") {
        key = `${date.toLocaleString("default", { month: "short" })}-${date.getFullYear()}`;
      } else if (period === "Yearly") {
        key = `${date.getFullYear()}`;
      }
      if (!groupMap[key]) groupMap[key] = 0;
      groupMap[key] += 1;
    });

    // Sort keys chronologically
    const sortedKeys = Object.keys(groupMap).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    return sortedKeys.map((date) => ({
      date,
      count: groupMap[date],
    }));
  };

  const disasterLineChartData = getDisasterFrequencyByDate(
    disasters,
    chartPeriod
  );

  const getActiveUsersCount = () => {
    if (!users || users.length === 0) return 0;
    return users.length;
  };

  const getTotalDonations = () => {
    if (!payment_data || payment_data.length === 0) return 0;
    // If payment_data.amount is a string with "$", remove it and convert to number
    return payment_data.reduce((sum, p) => {
      let amount =
        typeof p.amount === "string"
          ? Number(p.amount.replace(/[^0-9.-]+/g, ""))
          : p.amount;
      return sum + (Number(amount) || 0);
    }, 0);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
      setUsers([]);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dashboard/");
      const data = await response.json();
      setDashboardData({
        Donations: data.Donations ?? "",
        savings: data.savings ?? "",
        Distribution: data.Distribution ?? "",
        BalanceAmount: data.BalanceAmount ?? "",
        usertraffic: data.usertraffic ?? 0,
        disastersinfo: data.disastersinfo ?? [],
      });
    } catch (error) {
      toast.error("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchUsers();
    fetchDisasters();
    fetchDatasetRecords();
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const activeId = localStorage.getItem("activeDatasetId");
    if (activeId && datasetRecords.length > 0) {
      const found = datasetRecords.find((ds) => ds._id === activeId);
      if (found) handleLoadDataset(found);
    }
    // Only run when datasetRecords changes
  }, [datasetRecords]);

  useEffect(() => {
    setNewRecode((prev) => ({ ...prev, remark, status }));
  }, [remark, status]);

  // Handle form submission to add a new recode
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const recodeWithChart = {
      ...newRecode,
      Donations: getTotalDonations().toFixed(2),
      savings: (getTotalDonations() - getTotalDonations() * 0.87).toFixed(2),
      Distribution: (
        users.filter((u) => u.status === "active").length / users.length || 0
      ).toFixed(2),
      BalanceAmount: (getTotalDonations() * 0.87).toFixed(2),
      usertraffic: getActiveUsersCount(),

      // Arrays
      disasters: disasterTypeCounts.map((d) => ({
        type: d.type,
        count: d.count,
      })), // If you want to store types
      disasterLineChartData, // Already in correct format
      users, // If you want to store users
      disastersinfo: latestDisasters, // If you want to store disaster info
      recodes: [
        {
          Id: newRecode.id,
          date: new Date(),
          remark,
          status,
        },
        // ...add more if needed
      ],
    };

    try {
      const response = await fetch("http://localhost:5000/api/dashboard/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recodeWithChart),
      });

      if (!response.ok) {
        throw new Error(`Failed to add record: ${response.statusText}`);
      }

      const data = await response.json();

      setNewRecode({ date: "", remark: "", status: "" }); // Reset form fields
      setIsFormVisible(false); // Close form
      fetchDashboardData();
      fetchDatasetRecords();

      //Clear model Fileds
      setRemark("");
      setStatus("");

      toast.success("Recode added successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to add recode." + error.message);
    }
  };

  const getChartData = (payments) => {
    const monthMap = {};

    payments.forEach((payment) => {
      const date = new Date(payment.createdAt);
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      const monthYear = `${month}-${year}`;
      if (!monthMap[monthYear]) {
        monthMap[monthYear] = 0;
      }
      monthMap[monthYear] += payment.amount;
    });

    return Object.keys(monthMap).map((monthYear) => ({
      label: monthYear,
      value: monthMap[monthYear],
    }));
  };
  const data = getChartData(payment_data);

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
      <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen text-gray-800">
        <div className="flex">
          <div className="flex-1 px-8 py-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-left">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
                  GUARDIAN EARTH{" "}
                  <span className="text-green-600">DASHBOARD</span>
                </h1>
                <p className="text-gray-500 text-[14px]">
                  Monitor, alert, and track resources for effective response.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    className="bg-white border pl-10 rounded-full py-2 px-5 w-72 outline-none text-sm shadow-sm focus:ring-1 focus:ring-green-400 transition"
                    placeholder="Search"
                    type="text"
                  />
                  <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-green-500 text-[14px] border text-green-500 rounded-lg shadow hover:bg-green-100 transition"
                  title="Export report as CSV"
                >
                  <FileDown className="w-5 h-5" />
                  Export Report
                </button>
              </div>
            </div>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 mb-4">
              <div className="flex items-center bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition gap-4 border border-gray-100">
                <HandCoins className="w-14 h-14 text-green-500 bg-green-50 rounded-xl p-2" />
                <div className="text-left w-full">
                  <p className="text-gray-400 text-sm font-medium">Donations</p>
                  <p className="text-[20px] font-semibold text-gray-700">
                    ${getTotalDonations().toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center h-[100px] bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition gap-4 border border-gray-100">
                <PiggyBank className="w-14 h-14 text-blue-500 bg-blue-50 rounded-xl p-2" />
                <div className="text-left w-full">
                  <p className="text-gray-400 text-sm font-medium">Savings</p>
                  <p className="text-[20px] font-semibold text-gray-700">
                    $
                    {getTotalDonations() -
                      (getTotalDonations() * 0.87).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center h-[100px] bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition gap-4 border border-gray-100">
                <BarChart3 className="w-16 h-16 text-purple-500 bg-purple-50 rounded-2xl p-3 opacity-70" />

                <div class=" text-left w-full ">
                  <p className="text-gray-400 text-sm font-medium">
                    Distribution
                  </p>
                  <p class="text-[18px] font-semibold text-gray-700">
                    {(
                      users.filter((user) => user.status === "active").length /
                        users.length || 0
                    ).toFixed(2)}
                  </p>
                  <p class="text-gray-400 text-[12px]">
                    <span className="text-green-400  font-semibold">+11% </span>
                    since last month
                  </p>
                </div>
              </div>

              <div className="flex items-center h-[100px] bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition gap-4 border border-gray-100">
                <PiggyBank className="w-16 h-16 text-yellow-500 bg-yellow-50 rounded-2xl p-3 opacity-70" />

                <div class=" text-left w-full ">
                  <p className="text-gray-400 text-sm font-medium">
                    Balance Amount
                  </p>
                  <p class="text-[18px] text-gray-700 font-semibold">
                    ${(getTotalDonations() * 0.87).toFixed(2)}
                  </p>
                  <p class="text-gray-400 text-[12px]">
                    <span className="text-green-400  font-semibold">+24% </span>
                    since last month
                  </p>
                </div>
              </div>

              <div className="flex items-center h-[100px] bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition gap-4 border border-gray-100">
                <Users className="w-16 h-16 text-cyan-500 bg-cyan-50 rounded-2xl p-3 opacity-70" />

                <div class=" text-left w-full ">
                  <p className="text-gray-400 text-sm font-medium">
                    User Traffic
                  </p>
                  <p class="text-[24px] font-semibold">
                    {getActiveUsersCount()}
                  </p>
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
                    <p class="text-lg font-semibold">This Month Donation</p>
                    <p class="text-[13px] font-normal text-gray-400">
                      Analysis of Donations for the Current Month
                    </p>
                  </div>
                  <div className="flex flex-row-reverse gap-3 mt-2 items-center justify-center">
                    <select
                      className="border px-3 py-1 w-[120px] h-[30px] rounded-[4px] text-text-secondary outline-none text-[13px] border-gray-300 mr-3"
                      value={chartPeriod}
                      onChange={(e) => setChartPeriod(e.target.value)}
                    >
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
                <Verticle_Barchart data={chartData} height={"24rem"} />
              </div>
              <div class="bg-white p-4 rounded-lg shadow">
                <div className="flex flex-col text-left">
                  <p class="text-lg font-semibold">Disaster Types</p>
                  <p class="text-[13px] font-normal text-gray-400">
                    Analysis based on the disaster types
                  </p>
                  <PieChart data={disasterTypeCounts} />
                </div>
              </div>
            </div>

            {/* Second Row Grid 1st Card*/}
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_200px_1fr]  gap-4 mb-4">
              <div class="bg-white p-4 rounded-lg shadow ">
                <div className="flex flex-col text-left ">
                  <p class="text-lg font-semibold">Disaster Frequency</p>
                  <p class="text-[13px] font-normal text-gray-400 ">
                    Analysis based on the disaster Frequency
                  </p>
                  <div className="pt-2">
                    <DisasterLineChart
                      data={disasterLineChartData}
                      height={470}
                    />
                  </div>
                </div>
              </div>
              {/* Second Row Grid 2nd Card*/}
              <div className="bg-white p-4 rounded-lg shadow mb-6 h-full">
                <h2 className="text-lg font-semibold mb-2 text-gray-700 pb-2 border-b border-gray-200">
                  Latest Disasters
                </h2>
                <div className="flex flex-col gap-4">
                  {latestDisasters.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                      No recent disasters found.
                    </p>
                  ) : (
                    latestDisasters.map((disaster, idx) => (
                      <div
                        key={disaster._id || idx}
                        className="flex items-center gap-4 border-b last:border-b-0 pb-3 last:pb-0"
                      >
                        <div className="flex flex-col text-left">
                          <span className="font-medium text-gray-700">
                            {disaster.disasterType}
                          </span>
                          <span className="text-[13px] mt-2 text-gray-500">
                            {disaster.description
                              ? disaster.description.length > 100
                                ? disaster.description.slice(0, 100) + "..."
                                : disaster.description
                              : ""}
                          </span>
                          <span className="text-[13px] mt-2 text-gray-400">
                            {new Date(
                              disaster.date || disaster.createdAt
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow w-full">
                <div className="flex flex-col text-left w-full mb-4 border-b border-gray-200 pb-2">
                  <p className="text-lg font-semibold">Registered Users</p>
                  <p className="text-[13px] font-normal text-gray-400 w-full">
                    List of registered users for Guardian Earth
                  </p>
                </div>
                <ul
                  className="max-h-[470px] overflow-y-auto pr-2"
                  style={{ minHeight: "180px" }}
                >
                  {users && users.length > 0 ? (
                    users.map((user, index) => (
                      <li
                        key={user._id || index}
                        className="flex items-center text-left gap-4 my-2 px-3 py-3 rounded-xl hover:bg-green-50 transition"
                      >
                        <div className="flex-shrink-0">
                          <img
                            alt={user.name}
                            className="rounded-full w-10 h-10 border border-green-200 shadow"
                            src={
                              user.profile_img || "https://placehold.co/40x40"
                            }
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900 text-[15px]">
                            {user.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {user.email}
                          </span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 text-sm py-4">
                      No users found.
                    </li>
                  )}
                </ul>
              </div>{" "}
            </div>

            <div class="bg-white p-4 rounded-lg shadow">
              <Dashboard_grid
                recodes={datasetRecords}
                fetchdata={fetchDatasetRecords}
                onSync={handleSyncRecode}
                onLoadDataset={handleLoadDataset}
              />
            </div>

            <div class="bg-white p-4 rounded-lg shadow flex flex-col justify-center items-center">
              {/* Button to toggle form visibility */}
              <button
                onClick={() => setIsFormVisible(true)}
                className="px-4 py-2 w-[200px] bg-green-500 text-white rounded-lg mb-4 h-[35px] flex items-center justify-center"
              >
                Add New Recode
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Add New Recode */}
      <Modal
        isOpen={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        title="Add New Recode"
      >
        <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded-lg ">
          <div className="flex flex-col gap-6  bg-white rounded-lg ">
            {/* Recode ID */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                Recode ID
              </label>
              <input
                type="text"
                name="id"
                value={newRecode.id}
                className="border h-[36px] mt-1 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-500 transition duration-300"
                required
              />
            </div>
            {/* Recode Remark */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                Recode Remark
              </label>
              <textarea
                name="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="border mt-1 border-gray-300 p-3 rounded-md w-full h-16 focus:outline-none focus:ring-1 focus:ring-green-500 transition duration-300"
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
                className="border h-[36px] mt-1 border-gray-300 text-[13px] pl-2 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-500 transition duration-300"
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
              className="bg-green-500 h-[40px] text-white px-6 py-2 text-[14px] rounded-lg mt-4 w-full hover:bg-green-600 focus:outline-none focus:ring-0 focus:ring-green-500 transition duration-300"
            >
              Add Recode
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Dashboard;
