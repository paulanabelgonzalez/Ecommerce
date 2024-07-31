import { Routes, Route } from "react-router-dom";

import { CardsContainer } from "../components/CardsContainer";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { NotFound } from "../pages/404";

export const Main = () => {
	return (
		<Routes>
			<Route path="/" element={<CardsContainer />} />
			<Route path="Login" element={<Login />} />
			<Route path="Register" element={<Register />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
