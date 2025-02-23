import React, { useEffect, useState } from "react";
import { get } from "../../../Services/ApiEndPoint";
import PurchaseCardAdmin from "../../Components/Admin/PurchaseCardAdmin";

const AdminPurchaseManagement = () => {
	const [purchases, setPurchases] = useState([]);

	const fetchPurchases = async () => {
		try {
			const response = await get("/api/v1/purchase-history/all");
			setPurchases(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching purchases:", error);
		}
	};

	useEffect(() => {
		fetchPurchases();
	}, []);

	return (
		<div className="w-full p-8 space-y-4">
			<h1 className="text-2xl font-bold">Purchase Management</h1>
			{purchases.length > 0 ? (
				purchases.map((purchase) => (
					<PurchaseCardAdmin key={purchase._id} purchase={purchase} />
				))
			) : (
				<p className="text-gray-500">No purchases found.</p>
			)}
		</div>
	);
};

export default AdminPurchaseManagement;
