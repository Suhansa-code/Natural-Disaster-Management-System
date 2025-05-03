import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash, FaSearch, FaCalendarAlt } from "react-icons/fa";
import { Plus, LayoutGrid, List, Map } from "lucide-react";
import { format } from "date-fns";
import { Toaster, toast } from "react-hot-toast";
import Modal from "../main-components/Model";
import DisasterForm from "./DisasterForm";

const AdminDisasterView = () => {
  const [imageModalUrl, setImageModalUrl] = useState(null);
  const [imageModalTitle, setImageModalTitle] = useState("");
  const [imageModalDescription, setImageModalDescription] = useState("");
  const [disasters, setDisasters] = useState([]);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDisaster, setEditingDisaster] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [shouldFocusSearch, setShouldFocusSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const deleteToastRef = useRef(null);
  const searchInputRef = useRef(null);

  // Fetch disasters
  const fetchDisasters = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/disaster");
      const data = await response.json();
      const filteredDisasters = Array.isArray(data.disasters)
        ? statusFilter === "All"
          ? data.disasters
          : data.disasters.filter((d) => d.status === statusFilter)
        : [];
      setDisasters(filteredDisasters);
    } catch (error) {
      toast.error("Error fetching disasters: " + error.message);
      setError("Error fetching disasters: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFocusSearch) {
      searchInputRef.current?.focus();
      setShouldFocusSearch(false);
    }
    fetchDisasters();
  }, [shouldFocusSearch, statusFilter]);

  // Approve/Reject logic if you have disaster approval
  const approveDisaster = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/disaster/${id}/approve`,
        { method: "PUT" }
      );
      if (!response.ok) throw new Error("Failed to approve disaster");
      toast.success("Disaster approved successfully");
      fetchDisasters();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const rejectDisaster = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/disaster/${id}/reject`,
        { method: "PUT" }
      );
      if (!response.ok) throw new Error("Failed to reject disaster");
      toast.success("Disaster rejected");
      fetchDisasters();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete logic
  const handleDelete = async (id) => {
    if (deleteToastRef.current) return;
    toast.dismiss();
    toast(
      (t) => (
        <div className="flex items-center gap-4">
          <p>Are you sure you want to delete this disaster?</p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                try {
                  const response = await fetch(
                    `http://localhost:5000/api/disaster/${id}`,
                    { method: "DELETE" }
                  );
                  const data = await response.json();
                  if (!response.ok)
                    throw new Error(
                      data.message || "Failed to delete disaster"
                    );
                  setDisasters((prev) => prev.filter((d) => d._id !== id));
                  toast.dismiss(t.id);
                  toast.success("Disaster deleted successfully");
                } catch (error) {
                  toast.dismiss(t.id);
                  toast.error("Error deleting disaster: " + error.message);
                }
              }}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000, position: "top-center" }
    );
  };

  // Filtered disasters for search
  const filteredDisasters = disasters.filter((d) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      (d.disasterType || "").toLowerCase().includes(searchTerm) ||
      (d.severityLevel || "").toLowerCase().includes(searchTerm) ||
      (d.description || "").toLowerCase().includes(searchTerm) ||
      (d.Location || "").toLowerCase().includes(searchTerm)
    );
  });

  // Edit handler
  const handleEdit = (disaster) => {
    setEditingDisaster(disaster);
    setIsEditModalOpen(true);
    setIsAddModalOpen(false);
  };

  // Table/Grid views (update fields as needed)
  const TableView = () => (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold text-gray-600">Type</th>
            <th className="px-6 py-4 font-semibold text-gray-600">Severity</th>
            <th className="px-6 py-4 font-semibold text-gray-600">Location</th>
            <th className="px-6 py-4 font-semibold text-gray-600">Date</th>
            <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDisasters.map((d) => (
            <tr
              key={d._id}
              className="bg-white hover:bg-gray-50 transition-colors relative group"
            >
              <td className="px-6 py-4 font-medium">{d.disasterType}</td>
              <td className="px-6 py-4">{d.severityLevel}</td>
              <td className="px-6 py-4">{d.Location}</td>
              <td className="px-6 py-4">
                {format(new Date(d.date), "MMM d, yyyy")}
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(d)}
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(d._id)}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <FaTrash size={16} />
                  </button>
                  {/* Approve/Reject buttons for pending disasters */}
                  {d.status === "Pending" && (
                    <>
                      <button
                        onClick={() => approveDisaster(d._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectDisaster(d._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
      {filteredDisasters.map((d) => (
        <div
          key={d._id}
          className="bg-white rounded-lg border-gray-100 border shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {d.images && (
            <img
              src={d.images}
              alt={d.disasterType}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          )}
          <div className="p-4 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {d.disasterType}
              </h2>
              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                {d.severityLevel}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{d.description}</p>
            <div className="space-y-5 text-xs text-gray-500">
              <div className="flex items-center">
                <Map className="mr-2 " /> {d.Location}
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />{" "}
                {format(new Date(d.date), "MMM d, yyyy")}
              </div>
            </div>
            <div className="mt-3 pt-3 flex items-center justify-between">
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(d)}
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(d._id)}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <FaTrash size={16} />
                </button>
              </div>
              {/* Approve/Reject buttons for pending disasters */}
              {d.status === "Pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => approveDisaster(d._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectDisaster(d._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const SearchBar = () => {
    return (
      <div className="relative max-w-md w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FaSearch className="h-4 w-4 text-gray-400 z-50" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm h-[36px] text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 outline-none focus:ring-green-500 focus:border-transparent transition-all duration-200 text-[13px]"
          placeholder="Search disasters..."
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setShouldFocusSearch(true);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <span className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors">
              ✕
            </span>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Toaster />
      <header className="bg-gray-50 shadow-sm sticky top-0 z-40">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center text-left">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Disaster Management
              </h1>
              <p className="text-sm text-gray-500">Admin Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <SearchBar />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border text-[13px] border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="All">All</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
              <div className="flex flex-row gap-2">
                <div className="inline-flex items-center rounded-lg z-20 border border-gray-200 bg-white p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    type="button"
                    className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "grid"
                        ? "bg-emerald-100 text-emerald-800"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4 mr-1 " />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    type="button"
                    className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "list"
                        ? "bg-emerald-100 text-emerald-800"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <List className="w-4 h-4 mr-1" />
                    Table
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingDisaster(null);
                  setIsAddModalOpen(true);
                  setIsEditModalOpen(false);
                }}
                className="hover:border-green-300 active:bg-green-100 z-10 w-[145px] h-[38px] mt-[1px] border border-gray-200 bg-white p-1 justify-center text-[#626262] hover:text-green-600 px-2 py-3 rounded-md transition-all duration-300 text-[14px] font-medium !rounded-button whitespace-nowrap cursor-pointer shadow-sm flex items-center"
              >
                <Plus className="mr-2" /> Add Disaster
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-3 text-sm bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}
        {loading ? (
          <div className="text-center text-gray-500 text-[15px] py-10">
            Loading disasters...
          </div>
        ) : filteredDisasters.length === 0 ? (
          <div className="text-center text-gray-400 text-[16px] py-10">
            No records found.
          </div>
        ) : viewMode === "grid" ? (
          <GridView />
        ) : (
          <TableView />
        )}
      </main>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingDisaster(null);
        }}
        title="Create New Disaster"
      >
        <DisasterForm
          onDisasterSuccess={fetchDisasters}
          onDisasterClosed={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingDisaster(null);
        }}
        title="Edit Disaster"
      >
        <DisasterForm
          initialData={editingDisaster}
          isEdit={true}
          onDisasterSuccess={fetchDisasters}
          onDisasterClosed={() => setIsEditModalOpen(false)}
        />
      </Modal>
      <Modal
        isOpen={!!imageModalUrl}
        onClose={() => setImageModalUrl(null)}
        title="Image Preview"
      >
        <div className="space-y-4">
          <img
            src={imageModalUrl}
            alt="Preview"
            className="w-full h-auto rounded-lg"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {imageModalTitle}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {imageModalDescription}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDisasterView;
