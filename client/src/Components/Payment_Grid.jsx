import React from "react";
import { IoDocumentOutline } from "react-icons/io5";

const Payment_Grid = ({ payments, loading }) => {
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
    <div className="grid grid-cols-6 w-[70vw] mx-auto text-center gap-y-2 ">
      {/* Table Headers */}
      <span className="text-[13px] text-left font-semibold text-text-secondary">
        Invoice ID
      </span>
      <span className="text-[13px] text-left font-semibold text-text-secondary">
        Invoice Name
      </span>
      <span className="text-[13px] text-left font-semibold text-text-secondary">
        Invoice Date
      </span>
      <span className="text-[13px] text-left font-semibold text-text-secondary">
        Invoice Amount
      </span>
      <span className="text-[13px] text-left font-semibold text-text-secondary">
        Status
      </span>
      <span className="text-[13px] text-left font-semibold text-text-secondary">
        Action
      </span>

      {/* Separator */}
      <div className="col-span-6 mt-2">
        <div className="w-full border-[1px] border-border-border1"></div>
      </div>

      {/* Table Body */}
      {loading ? (
        <p className="col-span-6 text-[13px] font-semibold text-text-secondary">
          Loading payments...
        </p>
      ) : (
        payments.map((payment) => (
          <React.Fragment key={payment.Id}>
            <span className="text-[13px] text-left overflow-hidden  font-normal text-text-secondary">
              {payment.transactionId ? payment.transactionId.slice(-5) : "N/A"}{" "}
            </span>
            <span className="text-[13px] text-left overflow-hidden font-normal text-text-secondary">
              {payment.user}
            </span>
            <span className="text-[13px] text-left overflow-hidden font-normal text-text-secondary">
              {payment.createdAt ? payment.createdAt.slice(0, 10) : "N/A"}
            </span>
            <span className="text-[13px] text-left overflow-hidden font-normal text-text-secondary">
              {payment.currency} {payment.amount}
            </span>
            <div className="flex justify-start w-full items-center ">
              <div
                className={`text-[13px] flex  max-w-fit px-2 items-center justify-center rounded-[20px] h-[22px] font-normal text-text-secondary ${
                  payment.status === "successful"
                    ? "bg-[#bfffd3]"
                    : "bg-[#ffbfc6]"
                }`}
              >
                <div className="flex flex-row items-center  ">
                  <div
                    className={`w-[5px] h-[5px] rounded-2xl mt-1 mr-2  ${
                      payment.status === "successful"
                        ? "bg-primary-light"
                        : "bg-primary-red"
                    }`}
                  ></div>
                  <span
                    className={`text-[12px] font-semibold ${
                      payment.status === "successful"
                        ? "text-primary-light"
                        : "text-primary-red"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-start gap-2">
              {payment.status === "pending" ? (
                <>
                  <button
                    onClick={() => approvePayment(payment._id, "SUCCESSFUL")}
                    className="px-2 py-0 bg-white border border-primary-light h-[26px] w-[66px] text-center flex flex-row justify-center   text-primary-light hover:bg-green-100 transition-all duration-200 font-normal rounded-[4px] text-[13px] "
                  >
                    <div className="flex flex-row items-center gap-2">
                      <p>Approve</p>
                    </div>
                  </button>

                  <button
                    onClick={() => approvePayment(payment._id, "FAILED")}
                    className="px-2 py-0 bg-white border text-center flex flex-row justify-center border-primary-red h-[26px] w-[66px]   text-primary-red hover:bg-red-100 transition-all duration-200 font-normal rounded-[4px] text-[13px] "
                  >
                    <div className="flex flex-row items-center gap-2">
                      <p>Reject</p>
                    </div>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => approvePayment(payment._id, "FAILED")}
                  className="px-2 py-0 bg-white border text-center flex flex-row justify-center border-border-default h-[26px] w-[140px]   text-text-secondary hover:bg-gray-100 transition-all duration-200 font-normal rounded-[4px] text-[13px] "
                >
                  <div className="flex flex-row items-center gap-2">
                    <IoDocumentOutline className="text-[14px]" />
                    <p>View Invoice</p>
                  </div>
                </button>
              )}
            </div>
            {/* Separator */}
            <div className="col-span-6">
              <div className="w-full h-[0.5px] bg-border-default opacity-30 border-none "></div>
            </div>
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default Payment_Grid;
