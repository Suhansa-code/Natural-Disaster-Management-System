import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Collection_Card from "../Components/Collection_Card";
import HomePageProducts from "../Components/HomePageProducts";
import Landing from "../Components/Landing";

function Home() {
	//Change title
	useEffect(() => {
		document.title = "Bespoke Furniture | Home";
	}, []);

	const user = useSelector((state) => state.Auth.user);
	const navigate = useNavigate();

	const gotoAdmin = () => {
		navigate("/admin");
	};

	return (
		<div>
			<div className="flex flex-col">
				<Landing />

				<HomePageProducts />
				<Collection_Card />
			</div>
		</div>
	);
}

export default Home;
