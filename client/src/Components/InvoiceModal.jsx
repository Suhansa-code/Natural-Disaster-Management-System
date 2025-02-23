import React from "react";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import { Link } from "react-router-dom";

const InvoiceModal = ({ isOpen, onClose, purchaseData }) => {
	if (!isOpen) return null;

	const generatePDF = () => {
		const doc = new jsPDF();
		doc.setFontSize(20);
		doc.text("Invoice Details", 20, 20);
		doc.setFontSize(12);
		doc.text(`Purchase ID: ${purchaseData.purchaseId}`, 20, 30);
		doc.text(`Total Amount: $${purchaseData.totalAmount}`, 20, 40);
		doc.text(`Payment Method: ${purchaseData.paymentMethod}`, 20, 50);
		doc.text(`Order Notes: ${purchaseData.orderNotes}`, 20, 60);
		doc.text("Products:", 20, 70);

		purchaseData.products.forEach((product, index) => {
			doc.text(
				`${product.itemName} - Quantity: ${product.quantity} - Price: $${product.price} - Total: $${product.totalPrice}`,
				20,
				80 + 10 * index
			);
		});

		doc.save("invoice.pdf");
	};

	const onclose = () => {
		window.location.reload();
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
				<h2 className="text-2xl font-bold mb-4">Invoice Details</h2>
				<p className="mb-2">
					<strong>Purchase ID:</strong> {purchaseData.purchaseId}
				</p>
				<p className="mb-2">
					<strong>Total Amount:</strong> ${purchaseData.totalAmount}
				</p>
				<p className="mb-2">
					<strong>Payment Method:</strong> {purchaseData.paymentMethod}
				</p>
				<p className="mb-4">
					<strong>Order Notes:</strong> {purchaseData.orderNotes}
				</p>
				<h3 className="mt-4 font-semibold">Products:</h3>
				<ul className="list-disc list-inside mb-4">
					{purchaseData.products.map((product, index) => (
						<li key={index}>
							{product.itemName} - Quantity: {product.quantity} - Price: $
							{product.price} - Total: ${product.totalPrice}
						</li>
					))}
				</ul>
				<div className="flex justify-between">
					<button
						onClick={generatePDF}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
					>
						Download PDF
					</button>

					<button
						onClick={(onClose, onclose)}
						className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default InvoiceModal;
