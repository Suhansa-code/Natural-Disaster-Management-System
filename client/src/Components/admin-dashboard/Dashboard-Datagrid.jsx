import React from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Dashboard_grid = ({ recodes, loading, fetchdata }) => {
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:5000/api/Dashboard/${id}`);
      fetchdata();
      toast.success("Recode Delete Successfully !");
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record.");
    }
  };

  return (
    <>
      <div className="w-auto mx-auto">
        {/* Payment Grid */}
        <div className="grid grid-cols-[1fr,1fr,2fr,1fr,1fr] text-center gap-y-2">
          {/* Table Headers */}
          {[
            "Recode ID",
            "Recode Date",
            "Recode Remark",
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
              Loading recodes...
            </p>
          ) : recodes.length === 0 ? (
            <p className="col-span-6 text-[13px] font-semibold text-text-secondary">
              No Recodes found.
            </p>
          ) : (
            recodes.map((recode) => (
              <React.Fragment key={recode.Id}>
                <span className="text-[13px] text-left font-normal text-text-secondary">
                  {recode.id ? recode.id.slice(-5) : "N/A"}
                </span>
                <span className="text-[13px] text-left font-normal text-text-secondary">
                  {recode.date ? recode.date.slice(0, 10) : "N/A"}
                </span>
                <span className="text-[13px] text-left font-normal text-text-secondary">
                  {recode.remark}
                </span>
                <span className="text-[13px] text-left font-normal text-text-secondary">
                  Saved
                </span>

                {/* Action Buttons */}
                <div className="flex justify-start gap-2">
                  <>
                    <button className="px-2 py-0 bg-primary-light border-primary-light h-[26px] w-[70px] text-white hover:bg-hover-light transition-all duration-200 font-normal rounded-[4px] text-[13px]">
                      Sync
                    </button>
                    <button
                      onClick={() => handleDelete(recode._id)}
                      className="px-2 py-0 bg-white border border-primary-red h-[26px] w-[70px] text-primary-red hover:bg-red-100 transition-all duration-200 font-normal rounded-[4px] text-[13px]"
                    >
                      Delete
                    </button>
                    <button className="px-2 py-0 bg-white border border-yellow-500 h-[26px] w-[120px] text-yellow-600 hover:bg-yellow-100 transition-all duration-200 font-normal rounded-[4px] text-[13px]">
                      Load Dataset
                    </button>
                  </>
                </div>
                {/* Separator */}
                <div className="col-span-6 h-[0.5px] bg-border-default opacity-30"></div>
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </>
  );
};
export default Dashboard_grid;
