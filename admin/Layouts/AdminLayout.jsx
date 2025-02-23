import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminNav from "../src/Components/Admin/AdminNav";

const AdminLayout = () => {
	const user = useSelector((state) => state.Auth.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user || user.role !== "admin") {
			navigate("/login");
		}
	}, [user]);
	return (
		<>
			<AdminNav />
			<Outlet />
		</>
	);
};

export default AdminLayout;
