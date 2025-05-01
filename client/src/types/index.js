// User interface representation
export const User = {
  id: "",
  name: "",
  email: "",
  role: "Admin", // or 'Editor', 'Viewer', 'User'
  status: "Active", // or 'Inactive', 'Pending'
  lastActive: "",
  avatar: "",
  department: "",
  joinDate: "",
};

// UserActivityData interface representation
export const UserActivityData = {
  date: "",
  logins: 0,
  actions: 0,
};

// UserStats interface representation
export const UserStats = {
  totalUsers: 0,
  activeUsers: 0,
  inactiveUsers: 0,
  pendingUsers: 0,
  newUsersToday: 0,
  userGrowthRate: 0,
};
