import React from "react";
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="currentColor"
			className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M19.5 8.25l-7.5 7.5-7.5-7.5"
			/>
		</svg>
	);
}

const AccordionCustomStyles = ({ purchaseHistory }) => {
	const [open, setOpen] = React.useState(0);

	const handleOpen = (value) => setOpen(open === value ? 0 : value);
	const handlePreview = (invoiceUrl) => {
		window.open(invoiceUrl, "_blank");
	};

	const handleDownload = async (invoiceUrl) => {
		try {
			const response = await fetch(invoiceUrl);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const blob = await response.blob();
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.download = `invoice_${new Date().toISOString()}.pdf`; // Set a default filename
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error("There was a problem with the download:", error);
		}
	};

	return (
		<>
			<div className="rounded-[30px] border-gray-300 border-[1.5px] px-10">
				<div className="grid grid-cols-4 gap-4 w-full h-10 text-[16px]  my-2 rounded-[25px] py-2 text-center font-normal  ">
					<div className="col-span-0">
						<span>Date</span>
					</div>
					<div className="col-span-1">
						<span>Purchase No</span>
					</div>
					<div className="col-span-1">
						<span>Amount</span>
					</div>
					<div className="col-span-1">
						<span>Status</span>
					</div>
				</div>
				{purchaseHistory.map((purchase, index) => (
					<Accordion
						key={index}
						open={open === index + 1}
						className="mb-2 rounded-lg border border-blue-gray-100 px-4"
					>
						<AccordionHeader
							onClick={() => handleOpen(index + 1)}
							className={`border-b-0 transition-colors ${
								open === index + 1 ? "text-[#dba04f] hover:!text-[#c28633]" : ""
							}`}
						>
							<div className="grid grid-cols-4 gap-4 w-full text-[14px] text-center font-normal  ">
								<div className="col-span-1">
									{new Date(purchase.purchaseDate).toLocaleString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									})}
								</div>
								<div className="col-span-1">
									<span>{purchase.purchaseId}</span>
								</div>
								<div className="col-span-1 pl-4">
									<span>${purchase.totalAmount}</span>
								</div>
								<div className="col-span-1 pl-8">
									<span>{purchase.paymentStatus}</span>
								</div>
							</div>
						</AccordionHeader>
						<AccordionBody className="border-[0px] border-b-[0px] border-gray-100 px-16">
							<div>
								<div className="grid grid-cols-2 gap-6  shadow-md  justify-between rounded-[5px] py-5 p-5 items-center">
									<div>
										<h3 className=" font-semibold text-gray-700 mb-2">
											Checkout Remark :
											<span className="font-normal text-gray-600">
												{"  "}
												{purchase.orderNotes}
											</span>
										</h3>
										<h3 className=" font-semibold text-gray-700">
											Payment Method :
											<span className="font-normal text-gray-600">
												{" "}
												{"  "}
												{purchase.paymentMethod}
											</span>
										</h3>
									</div>
									<div className="flex flex-row items-end space-x-2 justify-end">
										<button
											className="bg-[#af6c4d] text-white px-4 py-1 w-28 h-8 rounded-[20px] shadow hover:bg-[#d17f58] transition-all"
											onClick={() => handleDownload(purchase.invoiceUrl)}
										>
											Download
										</button>
										<button
											className="bg-gray-500 text-white px-4 py-1 w-28 h-8 rounded-[20px] shadow hover:bg-gray-600 transition-all"
											onClick={() => handlePreview(purchase.invoiceUrl)}
										>
											Preview
										</button>
									</div>
								</div>

								<div className="overflow-x-auto  rounded-lg bg-white mt-5">
									<table className="min-w-full table-auto">
										<thead>
											<tr className="bg-gray-100 text-left text-gray-600">
												<th className="px-4 py-2">Product Image</th>
												<th className="px-4 py-2">Item Name</th>
												<th className="px-4 py-2">Quantity</th>
												<th className="px-4 py-2">Price</th>
											</tr>
										</thead>
										<tbody>
											{purchase.products.map((product, idx) => (
												<tr key={idx} className="border-t">
													<td className="px-4 py-2">
														<img
															src={product.imageUrl}
															alt={product.itemName}
															className="w-[9vw] h-[8vw] rounded-[20px]"
															draggable="false"
														/>
													</td>
													<td className="px-4 py-2">{product.itemName}</td>
													<td className="px-4 py-2">{product.quantity}</td>
													<td className="px-4 py-2">${product.price}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</AccordionBody>
					</Accordion>
				))}
			</div>
		</>
	);
};

export default AccordionCustomStyles;
