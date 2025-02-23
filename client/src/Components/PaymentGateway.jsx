import React, { useState } from "react";
import "payhere-embed-sdk/dist/react.css";
import Payhere from "payhere-embed-sdk/dist/react";

const PaymentGateway = () => {
	const [success, setSuccess] = useState(false);
	const [showPayhere, setShowPayhere] = useState(false);

	return (
		<div>
			<button onClick={() => setShowPayhere(true)}>Continue to payment</button>

			<Payhere
				selector="#payhere-modal"
				embedURL={"https://app.payhere.co/altlabs/coffee"}
				open={showPayhere}
				onSuccess={(data) => {
					console.log("Payhere success", data);
					setSuccess(true);
				}}
				onFailure={(err) => {
					console.log("Payhere failed", err);
					setSuccess(true);
				}}
				onClose={() => {
					setShowPayhere(false);
					if (success) {
						console.log("Payment success");
					} else {
						console.log("Payment failed");
					}
				}}
			/>
		</div>
	);
};

export default PaymentGateway;
