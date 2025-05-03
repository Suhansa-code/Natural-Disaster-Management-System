import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import mapimage from "../../assets/map.png";
import Modal from "../main-components/Model";
import {
  FileText,
  MapPin,
  Users,
  Calendar,
  Phone,
  Edit,
  Trash2,
  LayoutGrid,
  List,
  Plus,
} from "lucide-react";
import { BackgroundBeams } from "../../Components/ui/background-beams";
import Disaster_form from "../disaster-management/DisasterForm";

const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const getSeverityColor = (level) => {
  const colors = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-orange-100 text-orange-800",
    Critical: "bg-red-100 text-red-800",
  };
  return colors[level] || "bg-gray-100 text-gray-800";
};

export default function ViewDisasters() {
  //Form State definition
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Disaster");
  const [location, setLocation] = useState("");
  const [disasterDate, setDisasterDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [dateError, setDateError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingdisaster, setEditingdisaster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disasterData, setDisasterData] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchDisaster = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/disaster", {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch disaster");
      }

      setDisasterData(data || []);
    } catch (error) {
      toast.error("Error fetching disasters:", error.message);
      console.error("Error fetching disasters:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelte = async (id) => {
    try {
      toast(
        (t) => (
          <div className="flex items-center gap-4 ">
            <p>Are you sure you want to delete this disaster?</p>
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  const response = await fetch(
                    `http://localhost:5000/api/disaster/${id}`,
                    {
                      method: "DELETE",
                    }
                  );

                  const data = await response.json();

                  if (!response.ok) {
                    throw new Error(
                      data.message || "Failed to delete disaster"
                    );
                  }
                  fetchDisaster();
                  toast.success("Disaster deleted successfully");
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
        {
          duration: 3000,
          position: "top-center",
        }
      );
    } catch (error) {
      console.error("Error deleting disaster:", error.message);
    }
  };

  const handleEdit = (disaster) => {
    setEditingdisaster(disaster);
    setTitle(disaster.title || "");
    setDescription(disaster.description || "");
    setCategory(disaster.category || "Disaster");
    setLocation(disaster.location || "");
    setDisasterDate(disaster.disasterDate || "");
    setImageUrl(disaster.imageUrl || "");
    setIsUpcoming(!!disaster.isUpcoming);
    setDateError("");
    setSuccessMessage("");
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    fetchDisaster();
  }, []);

  const handleModalClose = () => {
    console.log("performed");
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const ListCard = ({ data, navigate }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border z-30 border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-auto">
          <div className="lg:col-span-2 p-4 h-auto flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center mt-2">
                <div className="border-b border-gray-100 pb-3 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {data.disasterType}
                    </h2>
                  </div>
                  <p className="text-gray-500 text-xs">_Id : {data._id}</p>
                </div>

                <span
                  className={`${getSeverityColor(
                    data.severityLevel
                  )} px-3 py-1 rounded-full text-xs font-medium`}
                >
                  {data.severityLevel}
                </span>
              </div>

              <div className="flex flex-row justify-between items-center gap-5">
                <div className="py-3 space-y-3 text-left">
                  <div className="flex items-start gap-2 mr-10">
                    <FileText className="w-4 h-4 text-emerald-600 mt-1" />
                    <p className="text-sm text-gray-600 text-wrap text-left">
                      {data.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <p className="text-sm text-gray-600">{data.Location}</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-2 flex flex-row items-center gap-4 ml-2 px-2 h-[60px] shadow-md">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <div className="flex flex-col text-left items-left gap-1 mb-1">
                    <p className="text-[12px] font-normal text-emerald-900">
                      Contact
                    </p>
                    <p className="text-[15px] font-semibold text-emerald-900">
                      {data.contact}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 ">
              <button
                // onClick={() => navigate(`/edit-disaster/${data._id}`)}
                onClick={() => {
                  handleEdit(data);
                }}
                type="button"
                className="inline-flex items-center justify-around px-4 py-1 border w-[100px] h-[30px]  border-emerald-600 rounded-md text-xs font-medium text-emerald-700 bg-white hover:bg-emerald-50"
              >
                <Edit className="w-3 h-3 mr-1" />
                Update
              </button>
              <button
                onClick={() => {
                  handleDelte(data._id);
                }}
                type="button"
                className="inline-flex items-center justify-around px-4 py-1 border w-[100px] h-[30px] border-transparent rounded-md text-xs font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </button>
            </div>
          </div>

          <div className="relative m-5 lg:rounded-l-xl overflow-hidden w-auto max-h-[250px]">
            <img
              src={data.images}
              alt={`Map showing location of ${data.Location || "this disaster"}`}
              className="w-full h-full object-cover lg:rounded-l-xl"
              loading="lazy"
            />

            <div className="absolute top-0 right-0 backdrop-blur-md bg-white/30 border h-[50px] flex items-center border-white/20 shadow-lg rounded-xl p-3 m-2">
              <div className="flex items-center gap-2 justify-center">
                <Users className="w-4  text-emerald-900" />
                <div className="flex flex-col text-left">
                  <p className="text-[10px] font-normal text-emerald-900">
                    Affected
                  </p>
                  <p className="text-[15px] font-semibold text-emerald-900">
                    {data.numberOfPeopleAffected.toLocaleString()} Peoples
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute top-0 left-0 backdrop-blur-md bg-white/30 border h-[50px] flex items-center border-white/20 shadow-lg rounded-xl p-3 m-2">
              <div className="flex items-center gap-2 justify-center">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <div className="flex flex-col text-left">
                  <p className="text-[10px] font-normal text-emerald-900">
                    Date
                  </p>
                  <p className="text-[15px] font-semibold text-emerald-900">
                    {formatDate(data.date)}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3">
            </div>
          </div>
        </div>
      </div>
    );
  };

  const GridCard = ({ data, navigate }) => {
    return (
      <div className="bg-white z-20 rounded-xl shadow-sm border border-gray-100 p-2 overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col justify-between h-full ">
          <div className="flex flex-col">
            <div className="border-b border-gray-100 pb-3 text-left">
              {/* Header Details */}
              <div className="flex w-full  items-center justify-between ">
                <h2 className="text-lg font-semibold text-gray-900">
                  {data.disasterType}
                </h2>
                <span
                  className={`${getSeverityColor(
                    data.severityLevel
                  )} px-3 py-1 rounded-full text-xs font-medium`}
                >
                  {data.severityLevel}
                </span>
              </div>
            </div>

            <div className="relative my-3 h-[180px] lg:rounded-xl overflow-hidden w-auto max-h-[250px]">
              <img
                src={data.images}
                alt={`Map showing location of ${data.Location || "this disaster"}`}
                className="w-full object-cover rounded-xl"
                loading="lazy"
              />

              <div className="absolute top-0 right-0 backdrop-blur-md bg-white/30 border h-[50px] flex items-center border-white/20 shadow-lg rounded-xl p-3 m-2">
                <div className="flex items-center gap-2 justify-center">
                  <Users className="w-4  text-emerald-900" />
                  <div className="flex flex-col text-left">
                    <p className="text-[10px] font-normal text-emerald-900">
                      Affected
                    </p>
                    <p className="text-[15px] font-semibold text-emerald-900">
                      {data.numberOfPeopleAffected.toLocaleString()} Peoples
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3">
          
              </div>
            </div>

            <div className="flex flex-col justify-between items-center gap-5 w-full">
              <div className="py-3 space-y-4 text-left w-full">
                <div className="flex flex-row justify-between">
                  <div className="flex items-start gap-2 ">
                    <Calendar className="w-4 h-4 text-emerald-600 " />
                    <p className="text-sm text-gray-600 text-wrap text-left ">
                      {formatDate(data.date)}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 ">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <p className="text-sm text-gray-600 text-wrap text-left  ">
                      {data.contact}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 ">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <p className="text-sm text-gray-600 text-wrap text-left w-full ">
                    {data.description}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <p className="text-sm text-gray-600 text-left">
                    {data.Location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 flex justify-center gap-2">
            <button
              onClick={() => {
                handleEdit(data);
              }}
              type="button"
              className="inline-flex items-center justify-around px-4 py-1 border w-[100px] h-[30px]  border-emerald-600 rounded-md text-xs font-medium text-emerald-700 bg-white hover:bg-emerald-50"
            >
              <Edit className="w-3 h-3 mr-1" />
              Update
            </button>
            <button
              onClick={() => {
                handleDelte(data._id);
              }}
              type="button"
              className="inline-flex items-center justify-around px-4 py-1 border w-[100px] h-[30px] border-transparent rounded-md text-xs font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-6 pt-20">
          {/* Grid Background */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
      linear-gradient(to left, #22c55e 1px, transparent 1px), 
      linear-gradient(to top, #22c55e 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
                WebkitMaskImage:
                  "linear-gradient(to left, black 10%, transparent 100%)",
                maskImage:
                  "linear-gradient(to left, black 10%, transparent 90%)",
              }}
            ></div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col justify-start text-left ml-2">
              <h1 className="text-2xl font-semibold text-gray-700">
                Disaster Reports
              </h1>
              <p className="text-sm text-gray-400 mt-0">
                Stay informed with the latest disaster updates and response
                data.
              </p>
            </div>

            <div className="flex flex-row  gap-2">
              <div className="inline-flex items-center rounded-lg z-20 border border-gray-200 bg-white p-1">
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
                  List
                </button>
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
              </div>

              <button
                onClick={() => {
                  setIsAddModalOpen(true);
                }}
                className=" hover:border-green-300 active:bg-green-100 z-10 w-[145px] h-[38px] mt-[1px] border border-gray-200 bg-white p-1 justify-center text-[#626262] hover:text-green-600 px-2 py-3 rounded-md transition-all duration-300 text-[14px] font-medium !rounded-button whitespace-nowrap cursor-pointer shadow-sm flex items-center"
              >
                <Plus className="mr-2" /> Report Desaster
              </button>
            </div>
          </div>
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 z-20"
                : "grid-cols-1 z-20"
            }`}
          >
            {disasterData.disasters && disasterData.disasters.length > 0 ? (
              disasterData.disasters.map((disaster) =>
                viewMode === "list" ? (
                  <ListCard
                    key={disaster._id}
                    data={disaster}
                    navigate={navigate}
                  />
                ) : (
                  <GridCard
                    key={disaster._id}
                    data={disaster}
                    navigate={navigate}
                  />
                )
              )
            ) : (
              <p className="text-gray-500">No disaster reports available.</p>
            )}
          </div>
        </div>
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            handleModalClose();
          }}
          title="Create New Disaster"
        >
          <Disaster_form
            onSubmit={(formData) => {
              setdisasters([
                ...disasters,
                {
                  ...formData,
                  _id: Date.now().toString(),
                  createdAt: new Date().toISOString(),
                },
              ]);
              setIsAddModalOpen(false);
              toast.success("disaster created successfully");
            }}
            onDisasterClosed={handleModalClose}
            onDisasterSuccess={fetchDisaster}
          />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          title="Edit disaster"
        >
          <Disaster_form
            initialData={editingdisaster}
            isEdit={true}
            onSubmit={(formData) => {
              setdisasters(
                disasters.map((disaster) =>
                  disaster._id === editingdisaster._id
                    ? { ...disaster, ...formData }
                    : disaster
                )
              );
              setIsEditModalOpen(false);
              toast.success("disaster updated successfully");
            }}
            onDisasterClosed={handleModalClose}
            onDisasterSuccess={fetchDisaster}
          />
        </Modal>
      </div>
    </>
  );
}
