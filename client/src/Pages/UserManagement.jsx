import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import Modal from "../Components/main-components/Model";
import {
  UserPlus,
  UserRoundPen,
  MapPinHouse,
  Filter,
  RefreshCw,
  MoreVertical,
  Check,
  X,
  UserX,
  Edit,
  Trash2,
  Download,
  SortAsc,
  SortDesc,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users as UsersIcon,
  Clock,
  Building,
  Shield,
  Search,
  UserRoundCheck,
} from "lucide-react";
import { userStats, usersByDepartment } from "../Dataset/mockData";
import { cn } from "../lib/utils";

import { formatDate, getStatusColor, getRoleColor } from "../lib/utils";
import { Button } from "../Components/ui/Button";
import { Input } from "../Components/ui/Input";
import { Avatar } from "../Components/ui/Avatar";
import { Card, CardHeader, CardContent } from "../Components/ui/Card";

const MotionCard = motion(Card);
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = React.useState(null);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = React.useState(null);
  const [roleFilter, setRoleFilter] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [Users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersByCountry, setUsersByCountry] = useState([]);
  const [usersByRole, setusersByRole] = useState([]);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const PAGE_SIZE = 5;

  // Fetch users from the backend

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/auth/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
        },
      });
      const users = response.data;

      // Group users by country
      const groupedByCountry = users.reduce((acc, user) => {
        const country = user.Country || "Unknown";
        if (!acc[country]) {
          acc[country] = 0;
        }
        acc[country]++;
        return acc;
      }, {});

      // Group users by Role
      const grouedByRole = users.reduce((acc, user) => {
        const role = user.role || "user";
        if (!acc[role]) {
          acc[role] = 0;
        }
        acc[role]++;
        return acc;
      }, {});

      // Convert grouped data into an array for rendering
      const countryData = Object.entries(groupedByCountry).map(
        ([country, count]) => ({
          country,
          count,
        })
      );

      setUsers(users);
      setUsersByCountry(countryData);
      setusersByRole(grouedByRole);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  //Set Active Deactive User
  const toggleUserStatus = async (userId, action) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/users/${userId}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? { ...user, status: action === "activate" ? "Active" : "Inactive" }
            : user
        )
      );

      // Update the selectedUser state if the modal is open
      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser((prevSelectedUser) => ({
          ...prevSelectedUser,
          status: action === "activate" ? "Active" : "Inactive",
        }));
      }

      toast.success(`User ${action}d successfully`);
    } catch (error) {
      toast.error(`Failed to ${action} user`);
      console.error(`Failed to ${action} user:`, error);
    }
  };

  //Delete User
  const deleteUser = async (userId) => {
    toast(
      (t) => (
        <div className="flex items-center gap-4">
          <p>Are you sure you want to delete this user?</p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                try {
                  const response = await axios.delete(
                    `http://localhost:5000/api/auth/users/${userId}`,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    }
                  );

                  setUsers((prevUsers) =>
                    prevUsers.filter((user) => user._id !== userId)
                  );

                  // Close the modal if the deleted user is currently selected
                  if (selectedUser && selectedUser._id === userId) {
                    setSelectedUser(null);
                  }

                  toast.success("User deleted successfully");
                } catch (error) {
                  toast.error("Failed to delete user");
                  console.error("Failed to delete user:", error);
                } finally {
                  toast.dismiss(t.id);
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
      {
        duration: 3000,
        position: "top-center",
      }
    );
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtering functionality
  const filteredUsers = Users.filter((user) => {
    // Safely access properties with optional chaining and default values
    const searchMatch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      "" ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      "" ||
      user.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      "";

    // Status filter
    const statusMatch = !statusFilter || user.status === statusFilter;

    // Role filter
    const roleMatch = !roleFilter || user.role === roleFilter;

    return searchMatch && statusMatch && roleMatch;
  });

  // Sorting functionality
  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...filteredUsers];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [filteredUsers, sortConfig]);

  // Pagination
  const paginatedUsers = sortedUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const pageCount = Math.ceil(sortedUsers.length / PAGE_SIZE);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }

    return sortConfig.direction === "ascending" ? (
      <SortAsc className="h-4 w-4" />
    ) : (
      <SortDesc className="h-4 w-4" />
    );
  };

  const handleUserSelect = (user) => {
    console.log(user);
    setSelectedUser(user);
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "user_data.xlsx");
  };

  return (
    <>
      <motion.div
        className="space-y-6 px-10 pt-5"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-left">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your organization's users, roles, and permissions
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              leftIcon={<UserPlus className="h-4 w-4" />}
              variant="primary"
            >
              Add New User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <MotionCard
            variants={itemVariants}
            className="bg-white hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center text-left">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Users
                  </p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {filteredUsers.length}
                  </p>
                  <div className="mt-1 flex items-center text-sm text-emerald-600">
                    <span className="font-medium">
                      +{userStats.userGrowthRate}%
                    </span>
                    <span className="ml-1">from last month</span>
                  </div>
                </div>
                <div className="p-2 bg-emerald-100 rounded-lg ">
                  <UsersIcon className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </MotionCard>

          <MotionCard
            variants={itemVariants}
            className="bg-white hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center text-left">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Active Users
                  </p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {
                      filteredUsers.filter((user) => user.status === "Active")
                        .length
                    }
                  </p>
                  <div className="mt-1 flex items-center text-sm">
                    <span className="text-emerald-600 font-medium">
                      {Math.round(
                        (filteredUsers.filter(
                          (user) => user.status === "Active"
                        ).length /
                          filteredUsers.length) *
                          100
                      )}
                      %
                    </span>
                    <span className="ml-1 text-gray-500">of total users</span>
                  </div>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserRoundCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </MotionCard>

          <MotionCard
            variants={itemVariants}
            className="bg-white hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center text-left">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Inactive Users
                  </p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {
                      filteredUsers.filter((user) => user.status === "Inactive")
                        .length
                    }
                  </p>
                  <div className="mt-1 flex items-center text-sm">
                    <span className="text-green-600 font-medium">
                      {Math.round(
                        (filteredUsers.filter(
                          (user) => user.status === "Inactive"
                        ).length /
                          filteredUsers.length) *
                          100
                      )}
                      %
                    </span>
                    <span className="ml-1 text-gray-500">of total users</span>
                  </div>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg">
                  <UserX className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </MotionCard>

          <MotionCard
            variants={itemVariants}
            className="bg-white hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center text-left">
                <div>
                  <p className="text-sm font-medium text-gray-500">New Today</p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {
                      filteredUsers.filter((user) => {
                        const today = new Date().toISOString().split("T")[0];
                        if (!user.joinDate) return false; // Skip users without a joinDate
                        const userJoinDate = new Date(user.joinDate)
                          .toISOString()
                          .split("T")[0];
                        return userJoinDate === today;
                      }).length
                    }
                  </p>
                  <div className="mt-1 flex items-center text-sm ">
                    <span className="text-green-600 font-medium">
                      {Math.round(
                        (filteredUsers.filter((user) => {
                          const today = new Date().toISOString().split("T")[0];
                          if (!user.joinDate) return false; // Skip users without a joinDate
                          const userJoinDate = new Date(user.joinDate)
                            .toISOString()
                            .split("T")[0];
                          return userJoinDate === today;
                        }).length /
                          filteredUsers.length) *
                          100
                      )}
                      %
                    </span>

                    <span className="ml-1 text-gray-500">Joined today</span>
                  </div>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </MotionCard>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 flex-1">
            <div className="w-full md:w-64">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 outline-none h-[30px]"
                leftIcon={<Search className="h-4 w-4 text-gray-400 " />}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Button
                  leftIcon={<Filter className="h-4 w-4" />}
                  rightIcon={<ChevronDown className="h-4 w-4" />}
                  variant="outline"
                  size="sm"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="text-gray-600"
                >
                  Status: {statusFilter || "All"}
                </Button>
                {showStatusDropdown && (
                  <div className="absolute mt-2 bg-white border text-gray-600 text-[13px] rounded shadow-lg z-10">
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setStatusFilter(null)}
                    >
                      All
                    </div>
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setStatusFilter("Active")}
                    >
                      Active
                    </div>
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setStatusFilter("Inactive")}
                    >
                      Inactive
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <Button
                  leftIcon={<Shield className="h-4 w-4" />}
                  rightIcon={<ChevronDown className="h-4 w-4" />}
                  variant="outline"
                  className="text-gray-600"
                  size="sm"
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                >
                  Role: {roleFilter || "All"}
                </Button>
                {showRoleDropdown && (
                  <div className="absolute mt-2 text-gray-600 bg-white border text-[13px] rounded shadow-lg z-10">
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setRoleFilter(null)}
                    >
                      All
                    </div>
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setRoleFilter("admin")}
                    >
                      Admin
                    </div>
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setRoleFilter("user")}
                    >
                      Users
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button
            leftIcon={<RefreshCw className="h-4 w-4" />}
            variant="secondary"
            size="sm"
            onClick={() => {
              fetchUsers();
            }}
          >
            Refresh
          </Button>
        </div>

        {/* User Table & Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MotionCard variants={itemVariants} className="overflow-hidden">
              <CardHeader className="py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    User List
                  </h2>
                  <Button
                    leftIcon={<Download className="h-4 w-4" />}
                    variant="outline"
                    size="sm"
                    onClick={handleExport}
                  >
                    Export
                  </Button>
                </div>
              </CardHeader>
              {loading ? (
                <div className="flex justify-center items-center h-screen">
                  <p className="text-lg font-medium text-gray-600">
                    Loading...
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full divide-y divide-gray-200 text-left">
                    <thead className="bg-gray-50 ">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => requestSort("name")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>User</span>
                            {getSortIcon("name")}
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => requestSort("role")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Role</span>
                            {getSortIcon("role")}
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => requestSort("status")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Status</span>
                            {getSortIcon("status")}
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => requestSort("lastActive")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Last Active</span>
                            {getSortIcon("lastActive")}
                          </div>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedUsers.map((user) => (
                        <motion.tr
                          key={user.id}
                          onClick={() => handleUserSelect(user)}
                          whileHover={{
                            backgroundColor: "rgba(243, 244, 246, 0.5)",
                          }}
                          className={`${selectedUser?.id === user.id ? "bg-emerald-50" : ""} cursor-pointer`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <Avatar
                                  src={user.profile_img}
                                  name={user.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <motion.span
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className={cn(
                                "inline-flex items-center px-2.5 py-[2px] rounded-full text-xs font-medium",
                                "bg-gray-100 text-gray-800",
                                getRoleColor(user.role)
                              )}
                            >
                              {user.role}
                            </motion.span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <motion.span
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className={cn(
                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                "bg-gray-100 text-gray-800",
                                getRoleColor(user.status)
                              )}
                            >
                              {user.status}
                            </motion.span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-[12px] text-gray-500">
                            {formatDate(user.last_active)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="relative">
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4 text-gray-400" />
                              </Button>
                              {/* We would add dropdown here in a real implementation */}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="bg-white px-10 py-3  flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === pageCount}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>

                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {(page - 1) * PAGE_SIZE + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(page * PAGE_SIZE, sortedUsers.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">{sortedUsers.length}</span>{" "}
                      users
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md text-gray-500 hover:bg-gray-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      {Array.from({ length: pageCount }).map((_, i) => (
                        <Button
                          key={i}
                          variant={page === i + 1 ? "primary" : "ghost"}
                          size="sm"
                          onClick={() => setPage(i + 1)}
                          className={`relative inline-flex items-center w-3 h-8 mx-1 px-4 outline-none py-2 text-sm font-medium ${
                            page === i + 1
                              ? "z-10 bg-emerald-50 border-emerald-500 text-emerald-600"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {i + 1}
                        </Button>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={page === pageCount}
                        onClick={() => setPage(page + 1)}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md text-gray-500 hover:bg-gray-50"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </nav>
                  </div>
                </div>
              </div>
            </MotionCard>
          </div>

          <div>
            {selectedUser ? (
              <MotionCard
                variants={itemVariants}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="py-4 px-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                      User Details
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedUser(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-6 py-4">
                  <div className="flex flex-col items-center mb-6">
                    <div className="mb-4">
                      <Avatar
                        src={selectedUser.avatar}
                        name={selectedUser.name}
                        size="lg"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedUser.name}
                    </h3>
                    <p className="text-gray-500">{selectedUser.email}</p>
                    <div className="mt-2 flex space-x-2">
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          "bg-gray-100 text-gray-800",
                          getRoleColor(selectedUser.role)
                        )}
                      >
                        {selectedUser.role}
                      </motion.span>

                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          "bg-gray-100 text-gray-800",
                          getRoleColor(selectedUser.status)
                        )}
                      >
                        {selectedUser.status}
                      </motion.span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-xs text-gray-500">Department</p>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedUser.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-xs text-gray-500">Join Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(selectedUser.joinDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-xs text-gray-500">Last Active</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(selectedUser.lastActive)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <Button
                      leftIcon={<Edit className="h-4 w-4" />}
                      variant="outline"
                      className="w-full"
                    >
                      Edit User
                    </Button>
                    {selectedUser.status === "Active" ? (
                      <Button
                        leftIcon={<UserX className="h-4 w-4" />}
                        variant="outline"
                        className="w-full text-amber-600 border-amber-200 hover:bg-amber-50"
                        onClick={() =>
                          toggleUserStatus(selectedUser._id, "deactivate")
                        }
                      >
                        Deactivate User
                      </Button>
                    ) : (
                      <Button
                        leftIcon={<Check className="h-4 w-4" />}
                        variant="outline"
                        className="w-full text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                        onClick={() =>
                          toggleUserStatus(selectedUser._id, "activate")
                        }
                      >
                        Activate User
                      </Button>
                    )}
                    <Button
                      leftIcon={<Trash2 className="h-4 w-4" />}
                      variant="outline"
                      className="w-full text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => deleteUser(selectedUser._id)}
                    >
                      Delete User
                    </Button>
                  </div>
                </CardContent>
              </MotionCard>
            ) : (
              <MotionCard
                variants={itemVariants}
                className="bg-white h-full flex flex-col"
              >
                <CardHeader className="py-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    User Distribution
                  </h2>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      By Country
                    </h3>
                    <div className="space-y-2">
                      {usersByCountry.map((countryData) => (
                        <div
                          key={countryData.country}
                          className="flex items-center"
                        >
                          <span className="text-sm text-gray-700 w-24 truncate">
                            {countryData.country}
                          </span>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden ml-2">
                            <motion.div
                              className="h-full bg-emerald-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(countryData.count / Math.max(...usersByCountry.map((d) => d.count))) * 100}%`,
                              }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 ml-2 w-10 text-right">
                            {countryData.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      By Role
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(usersByRole).map(([role, count]) => (
                        <div
                          key={role}
                          className={`p-3 rounded-lg border hover:shadow-md transition-all duration-300 ${
                            role === "Admin"
                              ? "border-purple-200 bg-purple-50"
                              : role === "Editor"
                                ? "border-blue-200 bg-blue-50"
                                : role === "Viewer"
                                  ? "border-teal-200 bg-teal-50"
                                  : "border-gray-200 bg-gray-50"
                          }`}
                        >
                          <p
                            className={`text-xs font-medium ${
                              role === "Admin"
                                ? "text-purple-800"
                                : role === "Editor"
                                  ? "text-blue-800"
                                  : role === "Viewer"
                                    ? "text-teal-800"
                                    : "text-gray-800"
                            }`}
                          >
                            {role}
                          </p>
                          <p className="text-lg font-bold text-gray-900 mt-1">
                            {count}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">users</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
            )}
          </div>
        </div>
      </motion.div>
      <Modal
        isOpen={selectedUser !== null}
        onClose={() => setSelectedUser(null)}
        title="User Details"
        size="lg"
        classNames={{ modal: "rounded-lg" }}
      >
        <CardContent className="px-6 py-4">
          <div className="flex flex-row justify-between items-center mb-2">
            <div className="flex items-center mb-4">
              <Avatar
                src={selectedUser?.profile_img}
                name={selectedUser?.name}
                size="lg"
              />
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedUser?.name}
                </h3>
                <p className="text-sm text-gray-500">{selectedUser?.email}</p>
              </div>
            </div>
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                "bg-gray-100 text-gray-800",
                getRoleColor(selectedUser?.status)
              )}
            >
              {selectedUser?.status}
            </motion.span>
          </div>
          <div className="space-y-4 mb-6 border-t border-gray-200 pt-8">
            <div className="flex flex-row gap-4 items-center justify-between">
              <div className="flex flex-col gap-8 items-start w-full">
                <div className="flex items-start">
                  <MapPinHouse className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Country</p>

                    <p className="text-sm font-medium text-gray-900">
                      {selectedUser?.Country}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />

                  <div>
                    <p className="text-xs text-gray-500">Join Date</p>

                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(selectedUser?.joinDate)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 items-start w-full">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />

                  <div>
                    <p className="text-xs text-gray-500">Last Active</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(selectedUser?.last_active)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <UserRoundPen className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />

                  <div>
                    <p className="text-xs text-gray-500">System Role</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedUser?.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center justify-around space-y-3 pt-4 border-t border-gray-200">
            <Button
              leftIcon={<Edit className="h-4 w-4" />}
              variant="outline"
              className="w-full text-[12px] h-full border mt-[10px] border-gray-200 hover:bg-gray-50"
            >
              Edit User
            </Button>
            {selectedUser?.status === "Active" ? (
              <Button
                leftIcon={<UserX className="h-4 w-4" />}
                variant="outline"
                className="w-full text-[12px]  h-[40px] text-amber-600 border border-amber-200 hover:bg-amber-50"
                onClick={() => toggleUserStatus(selectedUser._id, "deactivate")}
              >
                Deactivate User
              </Button>
            ) : (
              <Button
                leftIcon={<Check className="h-4 w-4" />}
                variant="outline"
                className="w-full text-[12px]  h-full text-emerald-600 border border-emerald-200 hover:bg-emerald-50"
                onClick={() => toggleUserStatus(selectedUser._id, "activate")}
              >
                Activate User
              </Button>
            )}
            <Button
              leftIcon={<Trash2 className="h-4 w-4" />}
              variant="outline"
              className="w-full h-[40px] text-red-600 border border-red-200 hover:bg-red-50"
              onClick={() => deleteUser(selectedUser._id)}
            >
              Delete User
            </Button>
          </div>
        </CardContent>
      </Modal>
    </>
  );
};
