import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Admin_Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/payment/");
      const data = await response.json(); // Convert response to JSON
      setPayments(data); // Set the data to state
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const approvePayment = async (id, action_status) => {
    console.log(id);
    try {
      await axios.put(`http://localhost:5000/api/payment/${id}`, {
        status: action_status, // Ensure backend updates status
      });
      fetchPayments(); // Refresh the list after approval
    } catch (error) {
      console.error("Error approving payment:", error);
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
      <h1 className="text-3xl font-bold mb-6">Payment Dashboard</h1>

      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Table */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Payments</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Username</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="border text-center">
                    <td className="p-2 border">{payment.username}</td>
                    <td className="p-2 border">${payment.amount}</td>
                    <td
                      className={`p-2 border rounded-[20px] text-white ${payment.status === "successful" ? "bg-primary-light" : "bg-red-500"}`}
                    >
                      {payment.status}
                    </td>
                    <td className="p-2 border">
                      {payment.status === "pending" && (
                        <div className="flex flex-row gap-2">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={() =>
                              approvePayment(payment._id, "successful")
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() =>
                              approvePayment(payment._id, "failed")
                            }
                          >
                            reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart */}
          <div className="bg-white p-4 rounded-lg shadow flex justify-center items-center">
            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_Payment;
