import { Routes, Route } from "react-router-dom";

import { CardsContainer } from "../components/CardsContainer";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const Main = () => {
	return (
		<Routes>
			<Route path="/" element={<CardsContainer />} />
			<Route path="Login" element={<Login />} />
			<Route path="Register" element={<Register />} />
		</Routes>
	);
};
