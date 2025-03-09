import React from "react";
import { useState } from "react";
import { IoDocumentOutline } from "react-icons/io5";
import axios from "axios";
const Payment_Grid = ({
  payments,
  loading,
  filterText_pros,
  sortOrder__pros,
  fetchPayments,
}) => {
  // Filter payments based on transaction ID
  const filteredPayments = payments.filter(
    (payment) =>
      payment.transactionId
        ?.toLowerCase()
        .includes(filterText_pros.toLowerCase()) ||
      payment.user?.toLowerCase().includes(filterText_pros.toLowerCase()) ||
      payment.createdAt
        ?.toLowerCase()
        .includes(filterText_pros.toLowerCase()) ||
      payment.status?.toLowerCase().includes(filterText_pros.toLowerCase()) ||
      payment.currency?.toLowerCase().includes(filterText_pros.toLowerCase())
  );

  // Sort payments based on selected option
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    switch (sortOrder__pros) {
      case "amount-asc":
        return a.amount - b.amount;
      case "amount-desc":
        return b.amount - a.amount;
      case "date-asc":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "date-desc":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

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

  return (
    <div className="w-[70vw] mx-auto">
      {/* Payment Grid */}
      <div className="grid grid-cols-6 text-center gap-y-2">
        {/* Table Headers */}
        {[
          "Invoice ID",
          "Invoice Name",
          "Invoice Date",
          "Invoice Amount",
          "Status",
          "Action",
        ].map((header) => (
          <span
            key={header}
            className="text-[13px] text-left font-semibold text-text-secondary"
          >
            {header}
          </span>
        ))}

        {/* Separator */}
        <div className="col-span-6 mt-2 border-[1px] border-border-border1"></div>

        {/* Table Body */}
        {loading ? (
          <p className="col-span-6 text-[13px] font-semibold text-text-secondary">
            Loading payments...
          </p>
        ) : sortedPayments.length === 0 ? (
          <p className="col-span-6 text-[13px] font-semibold text-text-secondary">
            No payments found.
          </p>
        ) : (
          sortedPayments.map((payment) => (
            <React.Fragment key={payment.Id}>
              <span className="text-[13px] text-left font-normal text-text-secondary">
                {payment.transactionId
                  ? payment.transactionId.slice(-5)
                  : "N/A"}
              </span>
              <span className="text-[13px] text-left font-normal text-text-secondary">
                {payment.user}
              </span>
              <span className="text-[13px] text-left font-normal text-text-secondary">
                {payment.createdAt ? payment.createdAt.slice(0, 10) : "N/A"}
              </span>
              <span className="text-[13px] text-left font-normal text-text-secondary">
                {payment.currency} {payment.amount}
              </span>
              {/* Status Badge */}
              <div className="flex justify-start items-center">
                <div
                  className={`text-[13px] flex max-w-fit px-2 items-center justify-center rounded-[20px] h-[22px] font-normal text-text-secondary ${
                    payment.status === "Successful"
                      ? "bg-[#bfffd3]"
                      : payment.status === "Failed"
                        ? "bg-[#ffd4df]"
                        : "bg-[#fff5b5]"
                  }`}
                >
                  <div className="flex flex-row items-center">
                    <div
                      className={`w-[5px] h-[5px] rounded-2xl mt-0 mr-2 ${
                        payment.status === "Successful"
                          ? "bg-primary-light"
                          : payment.status === "Failed"
                            ? "bg-primary-red"
                            : "bg-primary-yellow"
                      }`}
                    ></div>
                    <span
                      className={`text-[12px] font-semibold ${
                        payment.status === "Successful"
                          ? "text-primary-light"
                          : payment.status === "Failed"
                            ? "text-primary-red"
                            : "text-primary-yellow"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex justify-start gap-2">
                {payment.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => approvePayment(payment._id, "Successful")}
                      className="px-2 py-0 bg-white border border-primary-light h-[26px] w-[66px] text-primary-light hover:bg-green-100 transition-all duration-200 font-normal rounded-[4px] text-[13px]"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => approvePayment(payment._id, "Failed")}
                      className="px-2 py-0 bg-white border border-primary-red h-[26px] w-[66px] text-primary-red hover:bg-red-100 transition-all duration-200 font-normal rounded-[4px] text-[13px]"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => approvePayment(payment._id, "Failed")}
                    className="px-2 py-0 bg-white border border-border-default h-[26px] w-[140px] flex items-center justify-around text-text-secondary hover:bg-gray-100 transition-all duration-200 font-normal rounded-[4px] text-[13px]"
                  >
                    <IoDocumentOutline className="text-[14px]" />
                    View Invoice
                  </button>
                )}
              </div>
              {/* Separator */}
              <div className="col-span-6 h-[0.5px] bg-border-default opacity-30"></div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default Payment_Grid;
