import React, { useState } from "react";

const PaymentMethodSelection = ({ onChange }) => {
	const [selectedMethod, setSelectedMethod] = useState("");
	const [file, setFile] = useState(null);
	const [masterCardInfo, setMasterCardInfo] = useState({
		cardNumber: "",
		expiryDate: "",
		cvv: "",
	});

	const [paypalInfo, setPaypalInfo] = useState({
		email: "",
	});

	const handleChange = (e) => {
		setSelectedMethod(e.target.value);
		onChange(e.target.value);
	};

	// Handle the file upload
	const handleFileUpload = (e) => {
		const uploadedFile = e.target.files[0];
		setFile(uploadedFile);
	};

	// Handle MasterCard info changes
	const handleMasterCardChange = (e) => {
		const { name, value } = e.target;
		setMasterCardInfo((prevInfo) => ({
			...prevInfo,
			[name]: value,
		}));
	};

	// Handle PayPal info changes
	const handlePaypalChange = (e) => {
		const { name, value } = e.target;
		setPaypalInfo((prevInfo) => ({
			...prevInfo,
			[name]: value,
		}));
	};

	return (
		<div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				Select Payment Method
			</h2>

			{/* Dropdown */}
			<div className="relative">
				<select
					value={selectedMethod}
					onChange={handleChange}
					className="block w-full h-10 pl-12 pr-4 bg-gray-100 rounded-lg text-gray-700 border-2 border-gray-300 focus:outline-none focus:border-[#533B30] appearance-none"
				>
					<option value="" disabled>
						Select a payment method
					</option>

					{/* MasterCard Option */}
					<option value="mastercard" className="flex items-center">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Mastercard-logo.svg/500px-Mastercard-logo.svg.png"
							alt="MasterCard"
							className="w-5 h-5 mr-3"
							draggable="false"
						/>
						MasterCard
					</option>

					{/* PayPal Option */}
					<option value="paypal" className="flex items-center">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/a/a4/PayPal_logo_2014.svg"
							alt="PayPal"
							className="w-5 h-5 mr-3"
							draggable="false"
						/>
						PayPal
					</option>

					{/* Payment Slip Upload Option */}
					<option value="slipupload" className="flex items-center">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Invoice_icon.png"
							alt="Payment Slip Upload"
							className="w-5 h-5 mr-3"
							draggable="false"
						/>
						Payment Slip Upload
					</option>
				</select>

				{/* Custom Chevron Icon */}
				<div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5"
					>
						<path
							fillRule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>

			{/* Conditionally Render File Upload Card */}
			{selectedMethod === "slipupload" && (
				<div className="mt-6 p-6 bg-white rounded-lg shadow-xl border-t-4 border-[#533B30]">
					<h3 className="text-lg font-semibold text-gray-800 mb-6">
						Upload Payment Slip
					</h3>

					{/* File Upload Section */}
					<div className="flex flex-col items-center space-y-4 p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#bc7a5b8b] transition-all duration-300">
						<label
							htmlFor="file-upload"
							className="cursor-pointer text-white bg-[#533B30] hover:bg-[#533B30] py-3 px-6 rounded-lg shadow-md flex items-center"
						>
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Invoice_icon.png/24px-Invoice_icon.png"
								alt="File Upload"
								className="w-6 h-6 mr-3"
							/>
							Choose File
						</label>
						<input
							id="file-upload"
							type="file"
							onChange={handleFileUpload}
							className="hidden"
							accept=".pdf,.jpg,.png"
						/>
						<span className="text-gray-600 text-sm mt-2">
							or drag & drop here
						</span>

						{/* Drop Area */}
						<div className="w-full flex justify-center items-center py-8 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg mt-4">
							<p className="text-gray-600 text-center">
								Drag and drop your file here
							</p>
						</div>
					</div>

					{/* File name preview */}
					<div className="mt-4 text-gray-700">
						{file ? (
							<p className="font-medium text-gray-700">
								Selected file: {file.name}
							</p>
						) : (
							<p className="text-gray-500">No file selected</p>
						)}
					</div>
				</div>
			)}

			{/* Conditionally Render MasterCard Info Input */}
			{selectedMethod === "mastercard" && (
				<div className="mt-6 p-6 bg-white rounded-lg shadow-xl border-t-4 border-[#533B30]">
					<h3 className="text-lg font-semibold text-gray-800 mb-6">
						MasterCard Information
					</h3>
					<div className="space-y-6">
						{/* Card Number */}
						<div>
							<label
								htmlFor="cardNumber"
								className="block text-gray-600 font-medium mb-2"
							>
								Card Number
							</label>
							<input
								type="text"
								id="cardNumber"
								name="cardNumber"
								value={masterCardInfo.cardNumber}
								onChange={handleMasterCardChange}
								className="w-full h-10 p-3 bg-gray-100 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#533B30] transition-all duration-300"
								placeholder="Enter your card number"
							/>
						</div>

						{/* Expiry Date & CVV */}
						<div className="flex space-x-4">
							{/* Expiry Date */}
							<div className="w-1/2">
								<label
									htmlFor="expiryDate"
									className="block text-gray-600 font-medium mb-2"
								>
									Expiry Date
								</label>
								<input
									type="text"
									id="expiryDate"
									name="expiryDate"
									value={masterCardInfo.expiryDate}
									onChange={handleMasterCardChange}
									className="w-full h-10 p-3 bg-gray-100 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#533B30] transition-all duration-300"
									placeholder="MM/YY"
								/>
							</div>

							{/* CVV */}
							<div className="w-1/2">
								<label
									htmlFor="cvv"
									className="block text-gray-600 font-medium mb-2"
								>
									CVV
								</label>
								<input
									type="text"
									id="cvv"
									name="cvv"
									value={masterCardInfo.cvv}
									onChange={handleMasterCardChange}
									className="w-full h-10 p-3 bg-gray-100 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#533B30] transition-all duration-300"
									placeholder="CVV"
								/>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Conditionally Render PayPal Info Input */}
			{selectedMethod === "paypal" && (
				<div className="mt-6 p-6 bg-white rounded-lg shadow-lg border-t-4 border-[#533B30]">
					<h3 className="text-lg font-semibold text-gray-800 mb-4">
						PayPal Information
					</h3>
					<div className="space-y-6">
						<div className="relative">
							<label
								htmlFor="paypalEmail"
								className="block text-gray-600 font-medium mb-2"
							>
								PayPal Email
							</label>
							<input
								type="email"
								id="paypalEmail"
								name="email"
								value={paypalInfo.email}
								onChange={handlePaypalChange}
								className="w-full p-4 bg-gray-50 h-10 rounded-lg border-2 border-dashed border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#533B30] focus:ring-dashed placeholder:text-gray-500"
								placeholder="Enter your PayPal email"
							/>
							<span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
								<i className="fas fa-envelope"></i>
							</span>
						</div>

						{/* Add instructions or additional content */}
						<div className="mt-4 text-sm text-gray-500">
							<p>
								Please enter the email address linked to your PayPal account to
								proceed with the payment.
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PaymentMethodSelection;
