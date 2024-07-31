import { Routes, Route } from "react-router-dom";

import { CardsContainer } from "../components/CardsContainer";
import { Detail } from "../pages/Detail";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/404";
import { Register } from "../pages/Register";

export const Main = () => {
	return (
		<Routes>
			<Route path="/" element={<CardsContainer />} />
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="detail/:id" element={<Detail />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
